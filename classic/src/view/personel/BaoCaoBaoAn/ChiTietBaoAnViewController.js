Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChiTietBaoAnViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChiTietBaoAnViewController',
    init: function () {
    },
    control: {

    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
})