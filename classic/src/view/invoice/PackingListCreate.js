Ext.define('GSmartApp.view.invoice.PackingListCreate', {
    extend: 'Ext.form.Panel',
	xtype:'packinglistcreate',
	controller: 'packinglistcreate',
	stockind_record:null,
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
		xtype:'form',
		reference:'packinglistcreate',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		margin:2,
		items:[{
			layout:'hbox',
			margin:2,
			items:[{
				 xtype: 'textfield',
				 name: 'lotnumber',
				 fieldLabel: GSmartApp.Locales.solot[GSmartApp.Locales.currentLocale],
				 labelWidth:100,
				 flex:1,
				 margin:'0 5 0 0',
				 allowBlank: false,
				 required: true
			 }, {
				 xtype: 'numberfield',
				 name: 'packageid',
				 fieldLabel: GSmartApp.Locales.socay[GSmartApp.Locales.currentLocale],
				 labelWidth:100,
				 flex:1,
				 allowBlank: false,
				 required: true
				 
			 }]
		/*},{
			layout:'hbox',
			margin:2,
			items:[{
				 xtype: 'numberfield',
				 name: 'width',
				 label: GSmartApp.Locales.chieurong[GSmartApp.Locales.currentLocale],
				 labelWidth:130,
				 flex:1,
				 allowBlank: false,
				 required: true
			 }, {
				 xtype: 'numberfield',
				 name: 'ydsorigin',
				 label: GSmartApp.Locales.yds[GSmartApp.Locales.currentLocale],
				 labelWidth:150,
				 flex:1,
				 allowBlank: false,
				 required: true
			 }]
		},{
			layout:'hbox',
			margin:2,
			items:[{
				 xtype: 'numberfield',
				 name: 'netweight',
				 labelWidth:130,
				 label:GSmartApp.Locales.trongluongtinh[GSmartApp.Locales.currentLocale],
				 flex:1,
				 allowBlank: false,
				 required: true
			 }, {
				 xtype: 'numberfield',
				 name: 'grossweight',
				 label: GSmartApp.Locales.trongluongthucte[GSmartApp.Locales.currentLocale],
				 labelWidth:150,
				 flex:1,
				 allowBlank: false,
				 required: true
			 }]*/
		},{
			layout:'hbox',
			margin:2,
			items:[{
				 flex:1
			 }, {
				 xtype:'button',
				 text:GSmartApp.Locales.btn_themmoi[GSmartApp.Locales.currentLocale],
				 iconCls: 'x-fa fa-plus',
				 handler: 'onPackingListAdd'
			 }]
		}]
	},{
		html:'<hr>'
	},{
		flex:1,
		xtype:'grid',
		reference:'gridPackinglist',
		store:'PackinglistStore',
		plugins: {
			cellediting: {
				clicksToEdit: 1
			}
		},
		columns: [{
			text:GSmartApp.Locales.solot[GSmartApp.Locales.currentLocale],
			flex:1,
			dataIndex:'lotnumber'
		},{
			text:GSmartApp.Locales.socay[GSmartApp.Locales.currentLocale],
			width:100,
			dataIndex:'packageid',
			xtype: 'numbercolumn',
			format:'0,000',
			align:'right',
			
		},{
			text:GSmartApp.Locales.yds[GSmartApp.Locales.currentLocale],
			width:100,
			dataIndex:'ydsorigin',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			editor: {
					xtype: 'numberfield',
					required: true,
					validators: {
						type: 'number',
						message: 'Invalid number'
					}
				}
		},{
			text:GSmartApp.Locales.chieurong[GSmartApp.Locales.currentLocale],
			width:150,
			dataIndex:'width',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			editor: {
					xtype: 'numberfield',
					required: true,
					validators: {
						type: 'number',
						message: 'Invalid number'
					}
				}
		},{
			text:GSmartApp.Locales.trongluongtinh[GSmartApp.Locales.currentLocale],
			width:150,
			dataIndex:'netweight',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			editor: {
					xtype: 'numberfield',
					required: true,
					validators: {
						type: 'number',
						message: 'Invalid number'
					}
				}
		},{
			text:GSmartApp.Locales.trongluongthucte[GSmartApp.Locales.currentLocale],
			width:160,
			dataIndex:'grossweight',
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			editor: {
					xtype: 'numberfield',
					required: true,
					validators: {
						type: 'number',
						message: 'Invalid number'
					}
				}
		},{
			width: 30,
			hideable: false,
			cell: {
				tools:[{
					iconCls: 'fas fa-trash',
					tooltip:GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale], 
					handler: 'onDelete'
				}]
			}
		}]
	}],
	 buttons: [{
        text: GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
        handler: 'onPackingListSave',
		iconCls: 'x-fa fa-save'
    }, {
        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
        handler: 'onPackingListClose',
		iconCls: 'x-fa fa-window-close',
    }]
});

