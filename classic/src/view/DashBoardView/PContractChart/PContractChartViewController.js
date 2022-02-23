Ext.define('GSmartApp.view.DashBoardView.PContractChart.PContractChartViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractChartViewController',
    init: function () {
        // this?.Load();
    },
    control: {
        '#rdoType': {
            change: 'onFilter'
        },
        '#comboyear': {
            select: 'onSelect'
        }
    },
    Load: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractChartStore');
        var year = viewmodel.get('year');
        var type = viewmodel.get('type.type');
        store.loadStoreByType(type, year);
    },
    onFilter: function () {
        this.Load();
    },
    onSelect: function (cmb, rec, e) {
        this.Load();
    },
    onBarTipRender: function (tooltip, record, item) {
        tooltip.setHtml("Mã hàng " + record.get('mahang') + ': ' +
            record.get(item.field));
    },

    onGridMonthRender: function (value) {
        return value;
    },

    onGridValueRender: function (value) {
        return value;
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        return label;
    }
});