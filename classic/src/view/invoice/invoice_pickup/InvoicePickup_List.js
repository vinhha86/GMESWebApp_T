Ext.define('GSmartApp.view.invoice.InvoicePickup_List', {
    extend: 'Ext.grid.Panel',
	xtype: 'InvoicePickup_List',
	id: 'InvoicePickup_List',
	bind: {
		store: '{InvoiceList_Store}'
	},
	columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
		text: 'Số hóa đơn',
		dataIndex: 'invoicenumber',
		width: 100,
		items: {
			xtype: 'textfield',
			fieldStyle: "",
			reference: 'invoicenumberFilter',
			width: 1966,
			flex: 1,
			margin: 2,
			enableKeyEvents: true,
			listeners: {
				keyup: 'onInvoicenumberFilterKeyup',
				buffer: 500
			},
			bind:{
				value: '{invoice_number}'
			}
		}
	},{
		text: 'Ngày hóa đơn',
		xtype: 'datecolumn',
		format: 'd/m/Y',
		dataIndex: 'invoicedate',
		width: 120
	},{
		text: 'Nhà cung cấp',
		dataIndex: 'orgProviderName',
		flex: 1
	}],
	dockedItems: [{
		dock: 'top',
		layout: 'hbox',
		items: [{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ từ',
			itemId: 'invoicedate_from',
			editable: false,
			margin: '5 5 5 5',
			value: new Date(),
			width: 110,
            format:'d/m/y'
		},{
			xtype:'datefield',
			labelWidth: 0,
			emptyText: 'Ngày HĐ đến',
			itemId: 'invoicedate_to',
			editable: false,
			margin: '5 5 5 0',
			width: 110,
			value: new Date(),
            format:'d/m/y'
		},{
            xtype: 'combobox',
			emptyText: 'Nhà cung cấp',
			itemId: 'org_prodviderid_link',
            bind:{
                store: '{OrgProviderStore}'
            },
            queryMode: 'local',
			anyMatch: true,
            margin: '5 0 5 0',
            displayField: 'name',
            valueField: 'id'
        },{
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
	}]	
});

