Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_Main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Stockout_order_Main_ViewController',
    init: function () {
        
    },
    listen: {
        store: {
            'Stockout_order_Store': {
                'Stockout_order_Store_load_Done': 'onStockout_order_Store_load_Done'
            },
            'Stockout_order_d_store': {
                'Stockout_order_d_store_load_Done': 'onStockout_order_d_store_load_Done'
            },
        }
    },
    control: {
        '#Stockout_P_Stockout_order_Main_View': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect',
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var lenhXuatKhoSearch = viewModel.get('lenhXuatKhoSearch');
        var productSearchString = lenhXuatKhoSearch == null ? null : lenhXuatKhoSearch.trim();
        viewModel.set('productSearchString', productSearchString);
        viewModel.set('productStringFilterValue_order', productSearchString);

        var today = new Date();
		var fromDate_Default = new Date().setDate(today.getDate()-10);
		me.down('#stockoutorderdate_from').setValue(new Date(fromDate_Default));
        var toDate_Default = new Date().setDate(today.getDate()+10);
		me.down('#stockoutorderdate_to').setValue(new Date(toDate_Default));

        var stockoutorderdate_from = me.down('#stockoutorderdate_from').getValue();
		var stockoutorderdate_to = me.down('#stockoutorderdate_to').getValue();

        // me.setLoading(true);
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage_async(stockoutorderdate_from, stockoutorderdate_to, 1, 1000, 21);
        Stockout_order_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    // this.fireEvent('logout');
                } 
                else {
                    Stockout_order_Store.fireEvent('Stockout_order_Store_load_Done');
                    // filter method here //
                    me.down('#Stockout_P_Stockout_order_View').getController().onProductStringFilterKeyup();
                    // console.log(records);
                }
            }
        });
    },

    onStockout_order_Store_load_Done: function(){
        this.setLoadingFalse();
    },
    onStockout_order_d_store_load_Done: function(){
        this.setLoadingFalse();
    },
    setLoadingFalse: function(){
        var me = this.getView();
        me.setLoading(false);
    },

    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout_order = viewModel.get('stockout_order');

        var select = me.down('#Stockout_P_Stockout_order_D_View').getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn cần chọn ít nhất một sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemSanPham", select, stockout_order);
    },

})