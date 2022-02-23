Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'CutplanProcessing_List_D',
	itemId: 'CutplanProcessing_List_D',
	columnLines: true,
	rowLines: true,
	border: true,
	// features: [{
	// 	ftype: 'summary',
	// 	dock: 'bottom'
	// }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	bind:{
		store: '{CutplanProcessingDStore}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			flex: 1,
			dataIndex: 'skucode',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldMaNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueMaNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
        {
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldTenNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueTenNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
        {
			text: 'Số lot', 
			dataIndex: 'lotnumber',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số cây', 
			dataIndex: 'packageid',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Dài cây', 
			dataIndex: 'met',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Số lá', 
			dataIndex: 'la_vai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Tiêu hao', 
			dataIndex: 'tieu_hao',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
        {
			text: 'Đầu tấm', 
			dataIndex: 'con_lai',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
		},
	],
});

