Ext.define('GSmartApp.view.stockout.StockoutOrderPickup_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'StockoutOrderPickup_D',
	id: 'StockoutOrderPickup_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
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
		store: '{Stockout_order_d_store}'
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
			flex: 1,
			// width: 120,	
			dataIndex: 'skucode'
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'sku_product_color',
			flex: 1
			// width: 90
		},{
			text: 'Cỡ', 
			dataIndex: 'coKho',
			flex: 1
			// width: 70
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL yêu cầu (m)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalyds'
		},
		{
			text: 'ĐVT', 
			dataIndex: 'unitName',
			flex: 1
			// width: 70
		},
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

