Ext.define('GSmartApp.view.stockin.Stockin_P_Order_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_P_Order_List_D',
	itemId: 'Stockin_P_Order_List_D',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false,
		// getRowClass: function (record, index) {
		// 	var c = record.get('status');
		// 	console.log(c);
		// 	if (c == -1) {
		// 		return 'epc-error';
		// 	}
		// 	else {
		// 		return 'epc-ok';
		// 	}
		// }
	},
	// plugins: {
	//     cellediting: {
	//         clicksToEdit: 1,
	//         listeners: {
	//             edit: 'onDItemEdit',
	//             // beforeedit: 'onPriceDItemBeforeEdit'
	//         }             
	//     }
	// },
	bind: {
		store: '{StockinD_Store_Order}'
	},
	columns: [
		{
			text: 'SKU',
			// text: 'Mã vạch',
			dataIndex: 'skuCode',
			width: 120,
			summaryRenderer: function (grid, context) {
				return "Tổng cộng";
			}
		}, {
			text: 'Mã SP',
			dataIndex: 'sku_product_code',
			width: 120,
		}, {
			text: 'Tên sản phẩm',
			dataIndex: 'sku_product_name',
			flex: 1
		}, {
			text: 'Màu',
			dataIndex: 'color_name',
			flex: 1
		}, {
			text: 'Cỡ',
			dataIndex: 'size_name',
			width: 50
		},
		{
			text: 'Loại thành phẩm', 
			dataIndex: 'loaiThanhPham',
			flex: 1
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL Y/C',
			align: 'right',
			dataIndex: 'totalpackage',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			// editor: {
			// 	xtype: 'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true,
			// 	bind: {
			// 		editable: '{iseditSL_YC}'
			// 	}
			// }
		},
		{
			xtype: 'numbercolumn',
			width: 90,
			format: '0,000',
			text: 'SL Nhập',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackagecheck',
			// editor: {
			// 	xtype: 'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true,
			// 	bind: {
			// 		editable: '{iseditSL}'
			// 	}
			// },
		},
	],
});

