Ext.define('GSmartApp.view.invoice.InvoicePickup_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'InvoicePickup_D',
	id: 'InvoicePickup_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
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
			dataIndex: 'unitname',
			width: 70
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Nhập', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage'
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'N.W', 
			align:'right',
			dataIndex: 'netweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'G.W', 
			align:'right',
			dataIndex: 'grossweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'M3', 
			align:'right',
			dataIndex: 'm3',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Đơn giá', 
		// 	align:'right',
		// 	dataIndex: 'unitprice',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/
		// 	}
		// },{
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Thành tiền', 
		// 	align:'right',
		// 	dataIndex: 'totalamount',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 120
		// },
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockin_contextmenu',
		// 	width: 40,
		// 	iconCls: 'x-fa fas fa-bars violetIcon',
		// 	tooltip:'PackingList',
		// 	handler: 'onViewPackingList'
		// }   	
	],
    fbar: [
		{
			minWidth: 80,
			text: 'Chọn',
			iconCls: 'x-fa fa-check',
			handler: 'onSelectButton'
		},
		{
			minWidth: 80,
			text: 'Đóng',
			iconCls: 'x-fa fa-window-close',
			handler: 'onCloseButton'
		}, 
	// , ,
	// '->'
	]	
});

