Ext.define('GSmartApp.view.stockout_product.stockout_p_order.Stockout_P_Order_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_P_Order_Main',
    id:'Stockout_P_Order_Main',
    layout: 'border',
    controller: 'Stockout_P_Order_Main_Controller',
    viewModel: {
        type: 'Stockout_P_Order_ViewModel'
    },
    items: [
        {
            region: 'center',
            border: true,
            margin: 1,
            xtype: 'Stockout_P_Order_List'
        },
        {
            region: 'south',
            margin: 1,
            height: '50%',
            xtype: 'Stockout_P_Order_D'
        },
    ],
    // listeners: {
    //     activate: 'onActivate'
    // }        
})