Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart_GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderStatusChart_GridController',
    init: function () {
        var viewModel = this.getViewModel();
        var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        POrderStatusChartStore.loadStore();
    },
});