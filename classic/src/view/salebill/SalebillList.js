Ext.define('GSmartApp.view.salebill.SalebillList', {
    extend: 'Ext.form.Panel',
	xtype:'salebilllist',
    controller: 'salebilllist',
	viewModel: {
        type: 'salebilllist'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	items:[{
		 margin:'5',
		 xtype:'form',
		 reference:'formSalebill',
		 layout:'hbox',
		 items:[{
			 margin:'0 5 0 5',
			 xtype: 'textfield',
			 emptyText:GSmartApp.Locales.sohoadon[GSmartApp.Locales.currentLocale],
			 name:'billcode'
		 },{
			 name:'orgbillid_link',
			 xtype: 'combobox',
			 emptyText:GSmartApp.Locales.cuahang[GSmartApp.Locales.currentLocale],
			 store:'OrgStore',
			 queryMode: 'local',
			 anyMatch: true,
			 displayField: 'name',
			 valueField: 'id'
		 },{
			 margin:'0 5 0 5',
			 name:'salebilldate_from',
			 xtype: 'datefield',
			 dateFormat:GSmartApp.util.State.get('dataFormat'),
			 emptyText:GSmartApp.Locales.ngay_hoadontu[GSmartApp.Locales.currentLocale]
		 },{
			 name:'salebilldate_to',
			 xtype: 'datefield',
			 dateFormat:GSmartApp.util.State.get('dataFormat'),
			 emptyText: GSmartApp.Locales.ngay_hoadonden[GSmartApp.Locales.currentLocale]
		 },{
			 width:5
		 },{
			 width:100,
			 xtype:'button',
			 text:GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-filter',
			 handler:'onSearch'
		 },{
			 flex:1
		 },{
			 xtype:'button',
			 text:GSmartApp.Locales.btn_hoadonmoi[GSmartApp.Locales.currentLocale],
			 iconCls: 'x-fa fa-plus',
			 handler: 'onAddnew'
		 },{
			 width:5
		 }]
	},{
		flex:1,
		//height:300,
		margin:'10 2 2 2',
		xtype:'grid',
		store:'GSmartApp.store.salebill.SalebillListStore',
		reference:'gridSalebill',
		columnLines:true,
		rowLines:true,
		features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
		columns: [{ 
			text: GSmartApp.Locales.sohoadon[GSmartApp.Locales.currentLocale],
			dataIndex: 'billcode', 
			width: 150,
			summaryRenderer:function (grid, context) {
				return 'Tổng cộng';
			}
		},
		{ 
			text: GSmartApp.Locales.ngayhoadon[GSmartApp.Locales.currentLocale],
			dataIndex: 'billdate', 
			width: 120,
			summaryRenderer:function (grid, context) {
				return '';
			}
		},
		{ 
			text: GSmartApp.Locales.cuahang[GSmartApp.Locales.currentLocale],
			dataIndex: 'orgname', 
			flex:1
		},
		{ 
			text: GSmartApp.Locales.khachhang[GSmartApp.Locales.currentLocale],
			dataIndex: 'customername', 
			width: 200
		},
		{ 
			text: GSmartApp.Locales.tongtien[GSmartApp.Locales.currentLocale],
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			dataIndex: 'totalamount', 
			width: 120,
			summary: 'sum'
		},
		{ 
			text: GSmartApp.Locales.chietkhau[GSmartApp.Locales.currentLocale],
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			dataIndex: 'discount', 
			width: 120,
			summary: 'sum'
		},{
			text: GSmartApp.Locales.vat[GSmartApp.Locales.currentLocale],
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			dataIndex: 'totalvat', 
			width: 120,
			summary: 'sum'
		},
		{ 
			text: GSmartApp.Locales.thanhtoan[GSmartApp.Locales.currentLocale],
			xtype: 'numbercolumn',
			format:'0,0.00',
			align:'right',
			dataIndex: 'totalsum', 
			width: 140,
			summary: 'sum'
		},
		{ 
			xtype: 'actioncolumn',
			width: 50,
			menuDisabled: true,
			sortable: false,

			items: [{
				iconCls: 'x-fa fas fa-edit',
				tooltip:GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale], 
				handler: 'onEdit'
			}]
		}],
		listeners:{
			itemdblclick:'onItemdblclick'
		},
		bbar: {
			xtype: 'pagingtoolbar',
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}
	}]
});

