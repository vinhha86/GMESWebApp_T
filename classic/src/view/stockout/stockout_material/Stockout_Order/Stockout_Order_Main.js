Ext.define('GSmartApp.view.stockout.Stockout_Order_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_Order_Main',
    id:'Stockout_Order_Main',
    controller: 'Stockout_Order_Main_Controller',
    viewModel: {
        type: 'Stockout_Order_Main_Model'
    },
    layout: 'border',
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockout_Order'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockout_order_list_DetailView'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})