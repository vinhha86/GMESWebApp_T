Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Order_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_SubM_Order_List_Main',
    itemId:'Stockin_SubM_Order_List_Main',
    layout: 'border',
    controller: 'Stockin_SubM_Order_List_Main_Controller',
    // viewModel: {
    //     type: 'Stockin_M_ViewModel'
    // },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockin_SubM_Order_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockin_SubM_Order_List_D'
        },
    ],
})