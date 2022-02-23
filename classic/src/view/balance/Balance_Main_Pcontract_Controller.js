Ext.define('GSmartApp.view.balance.Balance_Main_Pcontract_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Balance_Main_Pcontract_Controller',
    init: function () {
    },
    control: {
        'Balance_D_Pcontract': {
            celldblclick: 'onCellDblClick'
        },
        '#cboMaterialId': {
            select: 'onMaterialSelect'
        }
    },
    onMaterialSelect: function(e, newValue, oldValue, eOpts ){
        //Xoa các mã hàng đã chọn
        Ext.getCmp('PContractProductTreeView').getSelectionModel().deselectAll();

        var viewmodel = this.getViewModel();
        store = viewmodel.getStore('PContractProductTreeStoreBalance');
        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);
        
        // console.log(newValue);
        // console.log(viewmodel.get('Balance.materialid_link'));
        if (viewmodel.get('Balance.materialid_link') > 0){
            //Cho phép chọn nhiều Mã hàng để tính toán
            viewmodel.set('Balance.p_selection_mode', 'MULTI');

            var product_bymaterial = viewmodel.getStore('Product_ByMaterial_Store');
            product_bymaterial.loadProductListByMaterial(viewmodel.get('PContract.id'), viewmodel.get('Balance.materialid_link'));
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
                        console.log(product_filters);
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
    onCellDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var viewmodel = this.getViewModel();
        if (cellIndex == 8) {//Nhu cau
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Chi tiết nhu cầu',
                closeAction: 'destroy',
                height: 500,
                width: 800,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Balance_D_Product_Skus',
                    viewModel: {
                        // type: 'Balance_D_Product_Skus_ViewModel',
                        data: {
                            productlist: record.data.product_d,
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 10) { // cột Nhập kho
            // bật danh sách phiếu nhập kho có chứa NPL đang chọn
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách phiếu nhập kho',
                closeAction: 'destroy',
                height: '95%',
                width: '95%',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockin_M_List_Main',
                    id: null,
                    itemId: 'Stockin_M_List_Main_CanDoiNPL',
                    viewModel: {
                        type: 'Stockin_M_ViewModel',
                        data: {
                            isCanDoiNplPopup: true,
                            mat_skuid_link: record.get('mat_skuid_link'),
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 11) {//Yeu cau xuat
            // var porderid_link = viewmodel.get('porderid_link');

            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Phiếu yêu cầu xuất cho sản xuất',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .8,
                width: Ext.getBody().getViewSize().width * .80,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_order_MainView',
                    viewModel: {
                        type: 'ProcessShippingMainViewModel',
                        data: {
                            isload: true, //them bien de load du lieu len hay khong
                            // porderid_link: porderid_link,
                            material_skuid_link: record.get('mat_skuid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link'),
                        }
                    }
                }]
            });
            form.show();
        } else if (cellIndex == 12) { // cột Xuất kho
            // bật danh sách phiếu xuất kho có chứa NPL đanh chọn
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách phiếu xuất kho',
                closeAction: 'destroy',
                height: '95%',
                width: '95%',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_M_List_Main',
                    viewModel: {
                        type: 'Stockout_M_EditModel',
                        data: {
                            isCanDoiNplPopup: true,
                            mat_skuid_link: record.get('mat_skuid_link'),
                        }
                    }
                }]
            });
            form.show();
        }

    },
    onCalBalance_OneProduct: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        // params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.pcontract_poid_link = null;
        params.list_productid = viewmodel.get('IdProduct');

        me.setLoading("Đang tính cân đối");
        if (null != params.pcontract_poid_link && 0 != params.pcontract_poid_link) {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
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