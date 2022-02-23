Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_BieuDo_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_KhoTP_BieuDo_Main_ViewModel',
    stores: {
        POrderLineChartStore: {
            type: 'POrderLineChart'
        },
		// CutplanProcessingLineChartStore: {
        //     type: 'CutplanProcessingLineChart'
        // },
    },
    data: {
        porder_id: null, 
    },
})