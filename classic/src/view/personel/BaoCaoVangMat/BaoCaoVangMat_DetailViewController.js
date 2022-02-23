Ext.define('GSmartApp.view.personel.BaoCaoVangMat.BaoCaoVangMat_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoVangMat_DetailViewController',
    init: function () {
    },
    control: {

    },
    renderSum: function (value) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
})