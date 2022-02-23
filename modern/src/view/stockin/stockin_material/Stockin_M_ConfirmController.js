Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_ConfirmController',
    isActivate: false,
    init: function () {
    },
    control: {
        '#btnLuu': {
            tap: 'onXacNhan'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onXacNhan: function() {
        this.fireEvent('XacNhan');
    },
})