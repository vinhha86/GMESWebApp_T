Ext.define('GSmartApp.view.stockout_product.stockout_p_order.Stockout_P_Order_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockout_P_Order_D',
	id: 'Stockout_P_Order_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'top'
	}],
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{stockout_order.stockout_order_d}'
	},
	columns: [
		{
			text: 'SKU', 
			flex: 1,
			// width: 120,	
			dataIndex: 'skucode_p'
		},
		{
			text: 'Màu', 
			dataIndex: 'color_name_p',
			flex: 1
		},
		{
			text: 'Cỡ', 
			dataIndex: 'size_name_p',
			flex: 1
			// width: 70
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL tồn', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalSLTon'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage'
		},
	],
});

