Ext.define('GSmartApp.view.DashBoardView.LineChartRegisterCodeCountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LineChartRegisterCodeCountController',
    init: function () {
        var viewModel = this.getViewModel();
        var LineChartRegisterCodeCountStore = viewModel.getStore('LineChartRegisterCodeCountStore');
        LineChartRegisterCodeCountStore.loadStore();
    },

    //___________________________________________

    onAxisLabelRender: function(axis, label, layoutContext) {
        // return label.toFixed(label < 10 ? 1 : 0) + '%';
        return label;
    },

    onSeriesTooltipRender: function(tooltip, record, item) {
        // xt.Date.format(label, 'd/m');
        var date = record.get('registerDate');
        var value = record.get(item.series.getYField()) == null ? 0 : record.get(item.series.getYField());
        tooltip.setHtml(Ext.Date.format(date, 'd/m') + ': ' + value);
    },

    onColumnRender: function(v) {
        // return v + '%';
        return v;
    },

    onToggleMarkers: function() {
        var chart = this.lookup('chart'),
            seriesList = chart.getSeries(),
            ln = seriesList.length,
            i = 0,
            series;

        for (; i < ln; i++) {
            series = seriesList[i];
            series.setShowMarkers(!series.getShowMarkers());
        }

        chart.redraw();
    },
});