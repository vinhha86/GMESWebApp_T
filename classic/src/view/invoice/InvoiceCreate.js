Ext.define('GSmartApp.view.invoice.InvoiceCreate', {
    extend: 'Ext.form.Panel',
	xtype:'InvoiceCreate',
	requires: ['Ext.grid.plugin.CellEditing'],
	controller: 'InvoiceCreateController',
	viewModel: {
        type: 'InvoiceCreateViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	qrcode:null,
	items:[{
		 layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		 },
		 reference:'formMaster',
		 items: [{
			 layout: {
				type: 'vbox',
				pack: 'start',
				align: 'stretch'
			},
			 xtype:'form',
			 reference:'formInvoice',
			 flex:1,
			 items:[{
				 layout: {
					type: 'hbox',
					align: 'center'
				},
				 margin:2,
				 items: [{
					 xtype:'hiddenfield',
					 name:'id'
				 },{
					 xtype:'hiddenfield',
					 name:'orgid_link'
				 },{
					 xtype:'hiddenfield',
					 name:'status'
				 },{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth :110,
					 xtype: 'textfield',
					 name:'invoicenumber',
					 reference:'invoicenumber',
					// allowBlank: false,
					// required: true,
					 fieldLabel : GSmartApp.Locales.sohoadon[GSmartApp.Locales.currentLocale]
				 },{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth:100,
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'invoicedate',
					 value:new Date(),
					 fieldLabel: GSmartApp.Locales.ngay_hoadon[GSmartApp.Locales.currentLocale]
					 
				 },{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth:110,
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'shipdatefrom',
					 fieldLabel: GSmartApp.Locales.ngay_roicang[GSmartApp.Locales.currentLocale]
				
				 },{
					 flex: 1,
					 labelWidth:100,
					 xtype: 'datefield',
					 dateFormat:GSmartApp.util.State.get('dataFormat'),
					 name:'shipdateto',
					 fieldLabel: GSmartApp.Locales.ngay_capcang[GSmartApp.Locales.currentLocale]
				 }]
			 },{
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				 },
				 margin:2,
				 items:[{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth:110,
					 name:'orgid_from_link',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.nhacungcap[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 anyMatch: true,
					 store:'ProviderStore',
					 displayField: 'name',
					 valueField: 'id'
				 },{
					 flex: 1,
					 labelWidth:110,
					 name:'orgid_to_link',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.donvinhan[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 anyMatch: true,
					 store:'WareHouseStore',
					 displayField: 'name',
					 valueField: 'id'
				 }]
			},{
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				 },
				 margin:2,
				 items: [{
					 flex: 1,
					 margin:'0 5 0 0',
					 name:'port_from_link',
					 labelWidth:110,
					 xtype: 'combobox',
					 fieldLabel:GSmartApp.Locales.cang_xephang[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 anyMatch: true,
					 store:'PortStore',
					 displayField: 'name',
					 valueField: 'id'
				 },{
					 flex: 1,
					 name:'port_to_link',
					 labelWidth:110,
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.cang_dohang[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 anyMatch: true,
					 store:'PortStore',
					 displayField: 'name',
					 valueField: 'id'
				 }]
			 },{
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				 },
				 margin:2,
				 items:[{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth:110,
					 xtype: 'numberfield',
					 name:'totalpackage',
					 fieldLabel: GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 },{
					 flex: 1,
					 margin:'0 5 0 0',
					 xtype: 'numberfield',
					 name:'totalm3',
					 fieldLabel: GSmartApp.Locales.sokhoi[GSmartApp.Locales.currentLocale]
				 },{
					 flex: 1,
					 margin:'0 5 0 0',
					 labelWidth:110,
					 xtype: 'numberfield',
					 name:'totalnetweight',
					 fieldLabel: GSmartApp.Locales.trongluongtinh[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 },{
					 flex: 1,
					 labelWidth:130,
					 xtype: 'numberfield',
					 name:'totalgrossweight',
					 fieldLabel: GSmartApp.Locales.trongluongthucte[GSmartApp.Locales.currentLocale],
					 readOnly:true
				 }]
			 },{
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				 },
				 margin:2,
				 items:[{
					 flex:1,
					 margin:'0 5 0 0',
					 labelWidth:110,
					 name:'p_skuid_link',
					 reference:'productcode',
					 xtype: 'combobox',
					 fieldLabel: GSmartApp.Locales.sanpham[GSmartApp.Locales.currentLocale],
					 queryMode: 'local',
					 anyMatch: true,
					 store:'SkuStore',
					 displayField: 'name',
					 valueField: 'id'
				 },{
					 flex: 1,
					 name:'customsnumber',
					 labelWidth:110,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.sotokhai[GSmartApp.Locales.currentLocale]
				 }]
			 },{
				 layout: {
					type: 'hbox',
					pack: 'start',
					align: 'stretch'
				 },
				 margin:2,
				 items:[{
					 flex: 1,
					 margin:'0 5 0 0',
					 name:'shippersson',
					 labelWidth:110,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.nguoigiaohang[GSmartApp.Locales.currentLocale]
				 },{
					 flex: 1,
					 name:'extrainfo',
					 labelWidth:110,
					 xtype: 'textfield',
					 fieldLabel: GSmartApp.Locales.ghichu[GSmartApp.Locales.currentLocale]
				 }]
			 }]
		 },{
			 width:200,
			 items:[{
				 id:'invoiceQrcode',
			 }]
		 }]
	},{
		html:'<hr>'
	},{
		xtype:'form',
		layout: {
			type: 'hbox',
			pack: 'start',
			align: 'stretch'
		 },
		items: [{
			 margin:'0 5 5 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-up',
			 bind:{
				 hidden:'{IsformMaster}'
			 },
			 handler: 'onHidden'
		 },{
			 margin:'0 5 5 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-angle-double-down',
			 bind:{
				 hidden:'{!IsformMaster}'
			 },
			 handler: 'onHidden'
		 },{
			 margin:'0 5 5 5',
			 xtype: 'textfield',
			 reference:'txtSkucode',
			 placeholder: GSmartApp.Locales.mahang[GSmartApp.Locales.currentLocale]
		 },{
			 margin:'0 5 5 5',
			 xtype:'button',
			 iconCls: 'x-fa fa-plus',
			 text: GSmartApp.Locales.btn_themvattu[GSmartApp.Locales.currentLocale],
			 handler: 'onAddSku'
		 }]
	},{
		flex:1,
		xtype:'grid',
		reference:'gridInvoice',
		columnLines:true,
		rowLines:true,
		selModel: 'cellmodel',
		plugins: {
			cellediting: {
				clicksToEdit: 1
			}
		},
		store:'GSmartApp.store.invoice.InvoiceDetailStore',
		columns: [{
			text:GSmartApp.Locales.ma_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skucode',
			flex:1
		},{
			text:GSmartApp.Locales.ten_vattu[GSmartApp.Locales.currentLocale], 
			dataIndex: 'skuname',
			flex:1
		},{
			text:GSmartApp.Locales.mau[GSmartApp.Locales.currentLocale], 
			dataIndex: 'colorname',
			flex:1
		},{
			text:GSmartApp.Locales.donvitinh[GSmartApp.Locales.currentLocale], 
			dataIndex: 'unitname',
			flex:1
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: GSmartApp.Locales.sokien[GSmartApp.Locales.currentLocale], 
			dataIndex: 'totalpackage',
			width:110,
			align:'right'
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.nw[GSmartApp.Locales.currentLocale], 
			dataIndex: 'netweight',
			width:110,
			align:'right'
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.gw[GSmartApp.Locales.currentLocale], 
			dataIndex: 'grossweight',
			width:110,
			align:'right'
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.yds[GSmartApp.Locales.currentLocale], 
			dataIndex: 'yds',
			width:100,
			align:'right'
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.foc[GSmartApp.Locales.currentLocale], 
			dataIndex: 'foc',
			width:100,
			align:'right',
			editor: {
                completeOnEnter: false,
                field: {
                    xtype: 'numberfield'
                }
            }
		},{
			xtype: 'numbercolumn',
			format:'0,0.00',
			text: GSmartApp.Locales.dongia[GSmartApp.Locales.currentLocale], 
			dataIndex: 'unitprice',
			width:100,
			align:'right',
			editor: {
                completeOnEnter: false,
                field: {
                    xtype: 'numberfield'
                }
            }
		},{
			xtype: 'actioncolumn',
			width: 50,
			menuDisabled: true,
			sortable: false,
			items: [{
				iconCls: 'x-fa fas fa-align-justify',
				tooltip:GSmartApp.Locales.packinglist[GSmartApp.Locales.currentLocale], 
				handler: 'onPackinglist'
			}, {
				iconCls: 'x-fa fas fa-trash',
				tooltip:GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale], 
				handler: 'onDelete'
			}]
		}]
	},{
		layout:'hbox',
		margin:5,
		items:[{
			width:100,
			xtype:'button',
			text:  GSmartApp.Locales.btn_quaylai[GSmartApp.Locales.currentLocale],
			handler: 'onBlack',
			iconCls: 'x-fa fa-backward',
		},{
			flex:1
		},{
			width:100,
			xtype:'button',
			text:  GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
			handler: 'onSave',
			iconCls: 'x-fa fa-save',
		}]
	}]
});

