Ext.define('GSmartApp.view.stockout.Stockout_M_List_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_List_Main',
    id:'Stockout_M_List_Main',
    controller: 'Stockout_M_List_Main_Controller',
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockout_M_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockout_M_List_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})