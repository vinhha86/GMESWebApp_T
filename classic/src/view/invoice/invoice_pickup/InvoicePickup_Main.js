Ext.define('GSmartApp.view.invoice.InvoicePickup_Main', {
	extend: 'Ext.container.Container',
	xtype: 'InvoicePickup_Main',
    itemId: 'InvoicePickup_Main',
    controller: 'InvoicePickup_Controller',
	viewModel: {
        type: 'InvoicePickup_ViewModel'
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
            xtype: 'InvoicePickup_List'
        },
        {
            region: 'center',
            xtype: 'InvoicePickup_D'
        },
        // {
        //     region: 'east',
        //     width: '20%',
        //     xtype: 'InvoicePickup_PkList'
        // }
    ]
});

