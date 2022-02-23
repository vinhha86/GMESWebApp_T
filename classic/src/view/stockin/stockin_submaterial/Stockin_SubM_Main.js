Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Stockin_SubM_Main',
    id:'stockin_subm',
    controller: 'Stockin_SubM_Main_Controller',
    viewModel: {
        type: 'Stockin_SubM_ViewModel'
    },
    items: [
        {
            title: 'Phiếu nhập kho',
            xtype: 'Stockin_SubM_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu nhập kho',
            xtype: 'Stockin_SubM_Order_List_Main',
            margin: 1,
        }, 
    ], 
})