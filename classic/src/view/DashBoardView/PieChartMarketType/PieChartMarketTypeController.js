Ext.define('GSmartApp.view.DashBoardView.PieChartMarketTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PieChartMarketTypeController',
    init: function () {
        var viewModel = this.getViewModel();
        var PieChartMarketTypeStore = viewModel.getStore('PieChartMarketTypeStore');
        PieChartMarketTypeStore.loadStore();
    },

    //___________________________________________

    onDataRender: function(v) {
        return v;
    },

    onSeriesTooltipRender: function(tooltip, record, item) {
        // Ext.util.Format.number(value, '0,000')
        var sum = record.get('sum');
        tooltip.setHtml(record.get('marketName') + ': ' + Ext.util.Format.number(sum, '0,000'));
    }
});