Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_List_Main',
    id: 'Stockin_M_List_Main',
    reference: 'Stockin_M_List_Main',
    itemId: 'Stockin_M_List_Main',
    layout: 'border',
    controller: 'Stockin_M_List_Main_Controller',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockin_M_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '40%',
            xtype: 'Stockin_M_List_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})