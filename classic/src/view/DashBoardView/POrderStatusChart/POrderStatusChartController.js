Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderStatusChartController',
    init: function () {
        var viewModel = this.getViewModel();

        var fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 1);
        var toDate = new Date();
        toDate.setMonth(toDate.getMonth() + 12);

        viewModel.set('fromDate', fromDate);
        viewModel.set('toDate', toDate);

        var text = 'Diễn biến sản xuất từ ' + Ext.Date.format(fromDate,'d/m/y') + ' đến ' + Ext.Date.format(toDate,'d/m/y');;
        var captions = {
            // title: {
            //     text: 'Số lượng ra chuyền/ngày tháng hiện tại',
            //     alignTo: 'chart'
            // },
            subtitle: {
                text: text,
                alignTo: 'chart'
            }
        };
        viewModel.set('captions', captions);
    },
    control: {
        '#btnRefresh':{
            click: 'onBtnRefresh'
        },
        '#btnChangeView':{
            click: 'onBtnChangeView'
        },
    },
    onBtnRefresh: function(){
        var viewModel = this.getViewModel();
        var mainView = Ext.getCmp('DashBoardMainView');
        if(mainView) mainView.setLoading(true);

        var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        POrderStatusChartStore.loadStore_async();
        POrderStatusChartStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(mainView) mainView.setLoading(false);
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    
                }
            }
        });
    },
    onBtnChangeView: function(){
        var viewModel = this.getViewModel();
        // var mainView = Ext.getCmp('DashBoardMainView');
        // if(mainView) mainView.setLoading(true);
        var isPOrderStatusChart_Grid_Show = viewModel.get('isPOrderStatusChart_Grid_Show');
        viewModel.set('isPOrderStatusChart_Grid_Show', !isPOrderStatusChart_Grid_Show);
        // var POrderStatusChartStore = viewModel.getStore('POrderStatusChartStore');
        // POrderStatusChartStore.loadStore_async();
        // POrderStatusChartStore.load({
        //     scope: this,
        //     callback: function(records, operation, success) {
        //         if(mainView) mainView.setLoading(false);
        //         if(!success){
        //             // this.fireEvent('logout');
        //         } else {
                    
        //         }
        //     }
        // });
    }
});