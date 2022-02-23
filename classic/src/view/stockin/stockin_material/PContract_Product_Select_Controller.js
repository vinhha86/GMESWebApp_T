Ext.define('GSmartApp.view.stockin.stockin_material.PContract_Product_Select_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Product_Select_Controller',
	init: function() {
        
    },
    control: {
		'#PContract_Product_Select': {
            afterrender: 'onAfterrender'
        },
	},
    onCloseButton:function(){
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(){
        var select = this.getView().getSelectionModel().getSelection();
        if(select.length > 0){
            this.fireEvent('onSelect_Products', select);
        }
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var stockin = viewmodel.get('stockin');
        var pcontractid_link = viewmodel.get('pcontractid_link');
		var ProductCodeFilterValue = viewmodel.get('ProductCodeFilterValue');
        // console.log(stockin);
        // console.log(pcontractid_link);
        // console.log(ProductCodeFilterValue);

        if(pcontractid_link != null){
            // view đơn hàng, có id pcontract -> tìm danh sách sản phẩm theo đơn hàng
            var PContractProductStore = viewmodel.getStore('PContractProductStore');
            // PContractProductStore.loadStore(pcontractid_link, null);
            PContractProductStore.loadStore_async(pcontractid_link, null);
            PContractProductStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        m.onProductCodeFilterKeyup();
                    }
                }
            });
        }else if(stockin.pcontractid_link != null){
            // view kho, có id pcontract -> tìm danh sách sản phẩm theo đơn hàng
            var PContractProductStore = viewmodel.getStore('PContractProductStore');
            // PContractProductStore.loadStore(stockin.pcontractid_link, null);
            PContractProductStore.loadStore_async(stockin.pcontractid_link, null);
            PContractProductStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        m.onProductCodeFilterKeyup();
                    }
                }
            });
        }else{
            // view kho, chưa có id pcontract -> tìm danh sách sản phẩm
            var PContractProductStore = viewmodel.getStore('PContractProductStore');
            // PContractProductStore.loadStore_product(ProductCodeFilterValue);
            PContractProductStore.loadStore_product_async(ProductCodeFilterValue);
            PContractProductStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        // imgproduct, productBuyerCode, productName, productinfo
                        // productid_link, product_code, product_name, product_desc

                        for(var i=0;i<records.length;i++){
                            var record = records[i];
                            record.set('productBuyerCode', record.get('buyercode'));
                            record.set('productName', record.get('buyername'));
                            record.set('productinfo', record.get('description'));
                            record.set('productid_link', record.get('id'));
                            record.set('product_code', record.get('buyercode'));
                            record.set('product_name', record.get('buyername'));
                            record.set('product_desc', record.get('description'));
                        }
                        PContractProductStore.commitChanges();
                        
                        // console.log(records);
                        m.onProductCodeFilterKeyup();
                    }
                }
            });
        }
    },
    onProductCodeFilterKeyup: function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('ProductCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.ProductCodeFilter = filters.add({
                id: 'ProductCodeFilter',
                property: 'productBuyerCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ProductCodeFilter) {
            filters.remove(this.ProductCodeFilter);
            this.ProductCodeFilter = null;
        }
    },
})