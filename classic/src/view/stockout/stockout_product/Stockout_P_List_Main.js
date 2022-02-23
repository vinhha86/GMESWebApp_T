Ext.define('GSmartApp.view.stockout.Stockout_P_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_P_List_Main',
    reference: 'Stockout_P_List_Main',
    itemId: 'Stockout_P_List_Main',
    layout: 'border',
    controller: 'Stockout_P_Controller',
    // viewModel: {
    //     type: 'Stockin_M_ViewModel'
    // },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'stockout_p_list'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockout_P_List_D'
        },
    ],
})