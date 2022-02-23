Ext.define('GSmartApp.view.stockin.StockIn_P_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'StockIn_P_Main',
    id:'stockin_p_main',
    controller: 'StockIn_P_Main_Controller',
    viewModel: {
        type: 'Stockin_P_ViewModel'
    },
    items: [
        // {
        //     title: 'Yêu cầu nhập kho',
        //     xtype: 'StockIn_P_Order_List_Main',
        //     margin: 1,
        // }, 
        {
            title: 'Phiếu nhập kho',
            xtype: 'StockIn_P_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu nhập kho',
            xtype: 'StockIn_P_Order_List_Main',
            margin: 1,
        }, 
    ], 
})