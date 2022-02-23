Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Stockout_order_ViewController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_P_Stockout_order_View': {
            afterrender: 'onAfterrender',
            itemclick: 'onStockoutOrderClick'
        },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        '#btnTimKiem': {
            click: 'onSearch'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSearch: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var stockoutorderdate_from = me.down('#stockoutorderdate_from').getValue();
		var stockoutorderdate_to = me.down('#stockoutorderdate_to').getValue();

        Stockout_order_Store.loadStore_byPage_async(stockoutorderdate_from, stockoutorderdate_to, 1, 1000, 21);
        Stockout_order_Store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    // this.fireEvent('logout');
                } 
                else {
                    // console.log(records);
                }
            }
        });
    },
    // onSelect: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
    //     var select = me.getSelectionModel().getSelection();
    //     if (select.length == 0) {
    //         Ext.Msg.show({
    //             title: "Thông báo",
    //             msg: "Phải chọn một đơn hàng",
    //             buttons: Ext.MessageBox.YES,
    //             buttonText: {
    //                 yes: 'Đóng',
    //             }
    //         });
    //         return;
    //     }
    //     this.fireEvent("ThemDonHang", select);
    //     // this.onThoat();
    // },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.getSorters().removeAll();
        Stockout_order_Store.getSorters().add({
            property: 'productbuyercode',
            direction: 'ASC'
        });
    },
    // onItemclick: function(thisView, record, item, index, e, eOpts){
    //     // console.log(record);
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();

    //     var mainView = me.up('window').down('#Stockout_P_Stockout_order_Main_View');
    //     if(mainView) mainView.setLoading(true);
    //     var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
    //     Stockout_order_d_store.loadStore(record.get('id'));
    // },

    onProductStringFilterKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('Stockout_order_Store');
        var productStringFilterValue_order = viewModel.get('productStringFilterValue_order');
        var filters = store.getFilters();

        if (productStringFilterValue_order) {
            this.productStringFilterValue_order = filters.add({
                id: 'productStringFilterValue_order',
                property: 'productbuyercode',
                value: productStringFilterValue_order,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.productStringFilterValue_order) {
            filters.remove(this.productStringFilterValue_order);
            this.productStringFilterValue_order = null;
        }
    },
    onStockoutOrderClick: function(view, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        var stockout_order = record.data;
        viewModel.set('stockout_order', stockout_order);
    }
    // renderSum: function(value, summaryData, dataIndex) {
    //     if (null == value) value = 0;
    //     return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    // },
    // renderCount: function(value, summaryData, dataIndex) {
    //     if (null == value) value = 0;
    //     return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    // },
})