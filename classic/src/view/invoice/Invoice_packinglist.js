Ext.define('GSmartApp.view.invoice.Invoice_packinglist', {
    extend: 'Ext.container.Container',
    xtype: 'Invoice_packinglist',
    id: 'Invoice_packinglist',
    controller: 'Invoice_packinglist_Controller',
    // viewModel: 'Invoice_packinglist_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'Invoice_packinglist_lotnumber',
                    width: '30%',
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'invoice_packinglist_detail',
                    margin: 1
                }
            ]
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                flex:1
            },
            {
                margin: 1,
                xtype:'button',
                text:  'Thoát',
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnThoat'
            }
        ]
        }        
    ] 
});
