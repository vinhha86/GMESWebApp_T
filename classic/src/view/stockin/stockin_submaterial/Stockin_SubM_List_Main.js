Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_SubM_List_Main',
    reference: 'Stockin_SubM_List_Main',
    itemId: 'Stockin_SubM_List_Main',
    layout: 'border',
    controller: 'Stockin_SubM_List_Main_Controller',
    // viewModel: {
    //     type: 'Stockin_M_ViewModel'
    // },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockin_SubM_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '40%',
            xtype: 'Stockin_SubM_List_D'
        },
    ],
})