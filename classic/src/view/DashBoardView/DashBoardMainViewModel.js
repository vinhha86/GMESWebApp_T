Ext.define('GSmartApp.view.DashBoardView.DashBoardMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DashBoardMainViewModel',
    requires: [
        'GSmartApp.store.DashBoardView.BarChartOutputAmountStore',
        'GSmartApp.store.DashBoardView.LineChartPackStockedAmountStore',
        'GSmartApp.store.DashBoardView.BarChartNotInProductionStore',
        'GSmartApp.store.DashBoardView.PieChartMarketTypeStore',
        'GSmartApp.store.DashBoardView.LineChartRegisterCodeCountStore',
        'GSmartApp.store.DashBoardView.POrderStatusChartStore',
        'GSmartApp.store.pcontract.PContractChartStore',
    ],
    stores: {
        BarChartOutputAmountStore: {
            type: 'BarChartOutputAmountStore'
        },
        LineChartPackStockedAmountStore: {
            type: 'LineChartPackStockedAmountStore'
        },
        BarChartNotInProductionStore: {
            type: 'BarChartNotInProductionStore'
        },
        PieChartMarketTypeStore: {
            type: 'PieChartMarketTypeStore'
        },
        LineChartRegisterCodeCountStore: {
            type: 'LineChartRegisterCodeCountStore'
        },
        POrderStatusChartStore: {
            type: 'POrderStatusChartStore'
        },
        PContractChartStore: {
            type: 'PContractChartStore'
        },
        YearStore: {
            data: [{
                id: (new Date().getFullYear()) - 1, name: (new Date().getFullYear()) - 1
            }, {
                id: (new Date().getFullYear()), name: (new Date().getFullYear())
            }, {
                id: (new Date().getFullYear()) + 1, name: (new Date().getFullYear()) + 1
            }]
        }
    },
    data: {
        isPOrderStatusChart_Grid_Show: true,
        fromDate: null,
        toDate: null,
        captions: null,
        year: new Date().getFullYear(),
        type: {
            type: 0
        }
    },
    formulas: {
        title: function (data) {
            var title = new Object();
            title.title = new Object();
            if (data('type.type') == 0) {
                title.title.text = 'Số lượng sản phẩm chưa có định mức';
            }
            else if (data('type.type') == 1) {
                title.title.text = 'Chào giá chưa có PO Line';
            }
            else {
                title.title.text = 'PO Line chưa Maps';
            }
            return title;
        }
    }
})