Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_SKU_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Edit_Product_SKU_ViewController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockin_P_Edit_Product_SKU_View': {
            afterrender: 'onAfterrender',
            // itemclick: 'onItemclick'
        },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        // '#btnSelect': {
        //     click: 'onSelect'
        // },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn một đơn hàng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemDonHang", select);
        // this.onThoat();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var SKUStore = viewModel.getStore('SKUStore');
        SKUStore.getSorters().removeAll();
        SKUStore.getSorters().add({
            property: 'code',
            direction: 'ASC'
        },{
            property: 'mauSanPham',
            direction: 'ASC'
        },{
            property: 'coSanPham',
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