Ext.define('GSmartApp.view.stockin.stockin_material.stockin_order.Stockin_Order_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_Order_List_D',
	id: 'Stockin_Order_List_D',
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
		getRowClass: function (record, index) {
			var c = record.get('status');
			console.log(c);
			if (c == -1) {
				return 'epc-error';
			}
			else {
				return 'epc-ok';
			}
		}
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
		store: '{Stockin_Order_D_Store}'
	},
	columns: [
		{
			text: 'Mã NPL',
			flex: 1,
			dataIndex: 'skuCode',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			}
		}, {
			text: 'Tên NPL',
			dataIndex: 'skuname',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldTenNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueTenNPLKeyup',
					buffer: 500
				}
			}
		}, {
			text: 'Mô tả',
			dataIndex: 'sku_product_desc',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		}, {
			text: 'Màu',
			dataIndex: 'sku_product_color',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		}, {
			text: 'Cỡ khổ',
			dataIndex: 'size_name',
			width: 70
		}, {
			text: 'ĐVT',
			dataIndex: 'unitid_link',
			width: 70,
			// editor: {
			// 	completeOnEnter: true,
			// 	field: {
			// 		xtype: 'combo',
			// 		typeAhead: true,
			// 		triggerAction: 'all',
			// 		selectOnFocus: false,
			// 		bind: {
			// 			store: '{UnitStore}',
			// 			// value: '{unitid_link}'
			// 		},
			// 		displayField: 'code',
			// 		valueField: 'id',
			// 		queryMode : 'local',
			// 		editable: false,
			// 		readOnly: true
			// 	}
			// },
			renderer: 'renderUnit'
		},
		{
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'SL Y/C (M)',
			align: 'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 90,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		}, {
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'SL kiểm (M)',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 90,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'SL Y/C (Y)', 
		// 	align:'right',
		// 	dataIndex: 'totalydsorigin',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 80,
		// 	bind: {
		// 		hidden: '{isYdsColumnHidden}',
		// 	},
		// 	// editor:{
		// 	// 	xtype:'textfield',
		// 	// 	maskRe: /[0-9]/,
		// 	// 	selectOnFocus: true
		// 	// },
		// },
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'SL kiểm (Y)', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'totalydscheck',
		// 	width: 85,
		// 	bind: {
		// 		hidden: '{isYdsColumnHidden}',
		// 	},
		// 	// editor:{
		// 	// 	xtype:'textfield',
		// 	// 	maskRe: /[0-9]/,
		// 	// 	selectOnFocus: true
		// 	// },
		// },
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL cây',
			align: 'right',
			dataIndex: 'totalpackage',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 60,
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9]/,
			// 	selectOnFocus: true
			// },
		},
		{
			text: 'Danh sách LOT',
			// dataIndex: 'lot_list',
			dataIndex: 'stockinDLot',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				if (value == null) value = '';
				value = value.toUpperCase();
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		}
	],
});

