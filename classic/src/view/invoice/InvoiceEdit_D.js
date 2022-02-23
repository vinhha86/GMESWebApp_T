Ext.define('GSmartApp.view.invoice.InvoiceEdit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceEdit_D',
	id: 'InvoiceEdit_D',
	controller: 'InvoiceEdit_D_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onInvoiceDItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
	bind:{
		store: '{invoice.invoice_d}'
	},
	columns: [
		// {
		// 	text: 'Loại', 
		// 	dataIndex: 'skucode',
		// 	width: 120,	
		// 	summaryRenderer:function () {
		// 		return "Tổng cộng";
		// 	}
		// },
		{
			text: 'Mã NPL', 
			width: 120,	
			dataIndex: 'skucode'
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'color_name',
			width: 90
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			width: 70
		},{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
			editor: {
				completeOnEnter: true,
				field: {
					xtype: 'combo',
					typeAhead: true,
					triggerAction: 'all',
					selectOnFocus: false,
					bind: {
						store: '{UnitStore}',
						// value: '{unitid_link}'
					},
					displayField: 'code',
					valueField: 'id',
					queryMode : 'local',
					editable: false,
					readOnly: true
				}
			},
			renderer: 'renderUnit'
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Số cây', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSumInteger',
			dataIndex: 'totalpackage',
			width: 70,
			editor:{
				xtype:'textfield',
				maskRe: /[0-9]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000') + '"';
				return Ext.util.Format.number(value, '0,000');
			}
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'N.W', 
			align:'right',
			dataIndex: 'netweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
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
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'G.W',
			align:'right',
			dataIndex: 'grossweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
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
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'M3', 
			align:'right',
			dataIndex: 'm3',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
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
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Nhập (m)', 
			align:'right',
			dataIndex: 'met',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 85,
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Nhập (y)', 
			align:'right',
			dataIndex: 'yds',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 85,
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Đơn giá', 
			width: 75,
			align:'right',
			dataIndex: 'unitprice',
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
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Thành tiền', 
			align:'right',
			dataIndex: 'totalamount',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 120,
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},
		{ 
			xtype: 'actioncolumn',
			reference: 'stockin_contextmenu',
			width: 30,
			menuDisabled: true,
			sortable: false,
			items: [
			// {
			// 	iconCls: 'x-fa fas fa-bars violetIcon',
			// 	tooltip:'PackingList',
			// 	handler: 'onViewPackingList'
			// },
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
		items: [{
			margin:'0 0 0 5',
			xtype: 'button',
			iconCls: 'x-fa fa-angle-double-up',
			itemId: 'btnThuGon',
			bind: {
				hidden: '{IsformMaster}'
			}
		}, {
			margin:'0 0 0 5',
			xtype: 'button',
			itemId: 'btnMoRong',
			iconCls: 'x-fa fa-angle-double-down',
			bind: {
				hidden: '{!IsformMaster}'
			}
		}, 
		{
			xtype: 'textfield',
			margin: '0 5 0 5',
			itemId:'skucode',
			fieldLabel: 'Mã NPL',
			width: 250,
			labelWidth: 60,
			hideLabel: false,			
            bind:{
				// disabled: '{isEdit}',
				value: '{skucode}'
			},
			enableKeyEvents : true,
			listeners: {
				keypress: 'onPressEnterBtnThemNPL'
			}
		},
		{
			tooltip: 'Thêm NPL',
			margin: '0 0 0 5',
			iconCls: 'x-fa fa-plus',
			weight: 30,
			itemId: 'btnThemNPL',
			// hidden: true
		},
		{
			tooltip: 'Tìm NPL',
			margin: '0 5 0 5',
			itemId: 'btnTimNPL',
			iconCls: 'x-fa fa-search',
			weight: 30,			
            bind:{
                // hidden: '{isEdit}'
            }
		},
		// '->',
		// {
		// 	xtype: 'textfield',
		// 	margin: '0 5 0 5',
		// 	itemId:'txtTimDonHang',
		// 	fieldLabel: 'Đơn hàng',
		// 	width: 250,
		// 	labelWidth: 80,
		// 	hideLabel: false,			
        //     bind:{
		// 		value: '{pcontractSearch}'
        //     }
		// },
		// {
		// 	tooltip: 'Tìm đơn hàng',
		// 	margin: '0 5 0 5',
		// 	itemId: 'btnTimDonHang',
		// 	iconCls: 'x-fa fa-search',
		// 	weight: 30,
		// }
	]
	}]
});

