Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Recon_Main_Pcontract_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        // var storeproduct = viewmodel.getStore('ReconProductTree_Store');
        // storeproduct.loadStore(viewmodel.get('pcontractid_link'), null);
        var storeproduct_recon = viewmodel.getStore('PContractProductTreeStoreRecon');
        storeproduct_recon.loadStore(viewmodel.get('pcontractid_link'), null);

        var storematerial = viewmodel.getStore('Material_ByContract_Store');
        storematerial.loadMaterialByContract(viewmodel.get('pcontractid_link'));
    },
    control: {
        '#btnRecon_Calculate': {
            click: 'onRecon_Calculate'
        },
        '#cboMaterialId': {
            select: 'onMaterialSelect'
        }
    },
    onMaterialSelect: function(e, newValue, oldValue, eOpts ){
        //Xoa các mã hàng đã chọn
        Ext.getCmp('Recon_ProductTree').getSelectionModel().deselectAll();

        var viewmodel = this.getViewModel();
        store = viewmodel.getStore('PContractProductTreeStoreRecon');
        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);
        
        // console.log(newValue);
        // console.log(viewmodel.get('Balance.materialid_link'));
        if (viewmodel.get('Balance.materialid_link') > 0){
            //Cho phép chọn nhiều Mã hàng để tính toán
            viewmodel.set('Balance.p_selection_mode', 'MULTI');

            var product_bymaterial = viewmodel.getStore('Product_ByMaterial_Store');
            product_bymaterial.loadProductListByMaterial(viewmodel.get('pcontractid_link'), viewmodel.get('Balance.materialid_link'));
            product_bymaterial.loadPage(1, {
                scope: this,
                callback: function (records, operation, success) {
                    if (success) {
                        store.clearFilter();
                        var filters = store.getFilters();
            
                        var product_filters = [];
                        for(var k =0; k<product_bymaterial.data.length; k++){
                            var p_data = product_bymaterial.data.items[k].data;
                            product_filters[k] = p_data.productid_link;

                            // this.codeFilter = filters.add({
                            //     id: 'codeFilter',
                            //     property: 'productid_link',
                            //     value: p_data.productid_link,
                            //     anyMatch: true,
                            //     caseSensitive: false
                            // });
                        }
                        // console.log(product_filters);
                        function legalProduct (item) {
                            if (item.firstChild != null){
                                if (Ext.Array.contains(product_filters, item.firstChild.get('productid_link')))
                                    return true;
                                else 
                                    return false;
                            } else {
                                if (Ext.Array.contains(product_filters, item.get('productid_link')))
                                return true;
                            else 
                                return false;
                            }
                        }
                        filters.add(legalProduct);                        
                    }
                }
            });


        } else {
            store.clearFilter();
            //Không chọn NPL -> Chỉ được chọn 1 mã hàng để tính toán
            viewmodel.set('Balance.p_selection_mode', 'SINGLE');
        }
    },
    setPcontractID: function(pcontractid_link){
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontractid_link',pcontractid_link);
    },
    onRecon_Calculate: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var ReconProduct_Store = viewmodel.getStore('ReconProduct_Store');
        var ReconMaterial_Store = viewmodel.getStore('ReconMaterial_Store');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');

        me.setLoading("Đang tính quyết toán");
        GSmartApp.Ajax.post_longtimeout('/api/v1/recon/cal_recon_bycontract', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    ReconProduct_Store.setData(response.productsku_data);
                    ReconMaterial_Store.setData(response.data);
                }
            } 
        })
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },

    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('SKUBalanceStore');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'mat_sku_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
})