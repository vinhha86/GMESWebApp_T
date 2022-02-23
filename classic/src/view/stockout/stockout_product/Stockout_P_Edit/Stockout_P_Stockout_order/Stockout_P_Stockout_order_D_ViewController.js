Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_D_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Stockout_order_D_ViewController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_P_Stockout_order_D_View': {
            afterrender: 'onAfterrender',
            // itemclick: 'onItemclick'
        },
        // // '#btnThoat': {
        // //     click: 'onThoat'
        // // },
        // // '#btnSelect': {
        // //     click: 'onSelect'
        // // },
    },
    // onThoat: function(){
    //     this.fireEvent('Thoat');
    // },
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

        // var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        var Stockout_order_d_store = me.getStore();
        Stockout_order_d_store.getSorters().removeAll();
        Stockout_order_d_store.getSorters().add({
            property: 'color_name_p',
            direction: 'ASC'
        },{
            property: 'size_name_p',
            direction: 'ASC'
        });
    },

    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    renderCount: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
})