Ext.define('GSmartApp.view.stockout.StockoutOrderPickup_Main', {
	extend: 'Ext.container.Container',
	xtype: 'StockoutOrderPickup_Main',
    itemId: 'StockoutOrderPickup_Main',
    controller: 'StockoutOrderPickup_Controller',
	viewModel: {
        type: 'StockoutOrderPickup_ViewModel'
    },    
	layout: 'border',
	// layout: {
	// 	type: 'vbox',
	// 	align: 'stretch'
	// },
    items:[
        {
            region: 'west',
            width: '35%',
            xtype: 'StockoutOrderPickup_List'
        },
        {
            region: 'center',
            xtype: 'StockoutOrderPickup_D'
        },
        // {
        //     region: 'east',
        //     width: '20%',
        //     xtype: 'InvoicePickup_PkList'
        // }
    ]
});

