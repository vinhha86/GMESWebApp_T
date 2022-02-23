Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_MainViewController',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    init: function () {
    },
    onThoat: function () {
        var me = this;
        me.fireEvent('Thoat');
    }
})