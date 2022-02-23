Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Dashboard_KhoTP_Main',
    itemId:'Dashboard_KhoTP_Main',
    // controller: 
    viewModel: {
        type: 'Dashboard_KhoTP_POLine_ViewModel'
    },
    items: [
        {
            title: 'Nhịp giao hàng',
            xtype: 'Dashboard_KhoTP_POLine_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Lệnh xuất kho',
            xtype: 'Stockout_P_Order_Main',
            margin: 1,
        }, 
    ], 
})