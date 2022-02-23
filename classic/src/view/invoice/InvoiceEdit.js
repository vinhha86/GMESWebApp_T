Ext.define('GSmartApp.view.invoice.InvoiceEdit', {
    extend: 'Ext.container.Container',
    xtype: 'InvoiceEdit',
    id: 'InvoiceEdit',
    controller: 'InvoiceEdit_Controller',
    viewModel: 'InvoiceEdit_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'InvoiceEdit_M',
            id: 'InvoiceEdit_M',
            margin: '5 0 0 0',
            height: 135
        },
        {
            xtype: 'InvoiceEdit_D',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack'
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu'
            }
        ]
        }        
    ] 
});
