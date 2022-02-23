Ext.define('GSmartApp.view.invoice.invoice_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'invoice_packinglist_detail',
	id: 'invoice_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'invoice_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPackingListItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},
	columns: [
		{
			text: 'Cây số', 
			dataIndex: 'packageid',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},
		{
			text: 'N.W', 
            dataIndex: 'netweight',
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
        {
			text: 'G.W', 
            dataIndex: 'grossweight',
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
        {
			text: 'M3', 
			dataIndex: 'm3',
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},
        {
			text: 'Khổ', 
			dataIndex: 'width',
			align:'right',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},
		{
			text: 'SL Nhập (m)', 
            dataIndex: 'met_origin',
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{
			text: 'SL Nhập (y)', 
            dataIndex: 'ydsorigin',
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{ 
			xtype: 'actioncolumn',
			reference: 'stockin_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
			{
				iconCls: 'x-fa fas fa-trash',
				tooltip: 'Xóa',
				handler: 'onXoa'
			}
		]
		}   	
	],
	dockedItems: [{
		dock: 'top',
        xtype: 'toolbar',
		items: [
            {
			xtype: 'textfield',
			margin: 1,
			itemId:'packageid',
			emptyText: 'Cây số',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9]/,		
            bind:{
				value: '{packinglist.packageid}'
            }
		},
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'netweight',
			emptyText: 'N.W',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,	
			maskRe: /[0-9.]/,		
            bind:{
				value: '{packinglist.netweight}'
            }
        },
        {
			xtype: 'textfield',
			margin: 1,
			itemId:'grossweight',
			emptyText: 'G.W',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.grossweight}'
            }
		},
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'m3',
			emptyText: 'M3',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.m3}'
            }
        },
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'width',
			emptyText: 'Khổ',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.width}'
            },
			readOnly: true
        },
        {
			xtype: 'textfield',
			margin: 1,
			itemId:'met_origin',
			emptyText: 'SL Nhập (m)',
			flex: 1,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.met_origin}'
            }
		},		
		{
			tooltip: 'Thêm',
			margin: '0 5 0 5',
			itemId: 'btnThemPKL',
			iconCls: 'x-fa fa-plus',
			weight: 30
		} 		
	]
	}]
});

