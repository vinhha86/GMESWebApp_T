Ext.define('GSmartApp.view.stockin.StockIn_P_List_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'StockIn_P_List_D',
	itemId: 'StockIn_P_List_D',
    controller: 'StockIn_P_List_D_Controller',
	cls: 'StockIn_P_List_D',
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
        // getRowClass: function(record, index) {
        //     var c = record.get('status');
		// 	var unitid_link = record.get('unitid_link');

		// 	var totalmet_origin = record.get('totalmet_origin') == null ? 0 : record.get('totalmet_origin');
		// 	var totalmet_check = record.get('totalmet_check') == null ? 0 : record.get('totalmet_check');
		// 	var totalydsorigin = record.get('totalydsorigin') == null ? 0 : record.get('totalydsorigin');
		// 	var totalydscheck = record.get('totalydscheck') == null ? 0 : record.get('totalydscheck');
		// 	var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
		// 	var netweight = record.get('netweight') == null ? 0 : record.get('netweight');
		// 	var grossweight_lbs = record.get('grossweight_lbs') == null ? 0 : record.get('grossweight_lbs');
		// 	var netweight_lbs = record.get('netweight_lbs') == null ? 0 : record.get('netweight_lbs');

		// 	if(
		// 		totalmet_origin == 0
		// 		&& totalmet_check == 0
		// 		&& grossweight == 0
		// 		&& netweight == 0
		// 		&& totalydsorigin == 0
		// 		&& totalydscheck == 0
		// 		&& grossweight_lbs == 0
		// 		&& netweight_lbs == 0
		// 	){
		// 		return 'epc-ok';
		// 	}
		// 	if(totalmet_check >= totalmet_origin && totalmet_check > 0 && (unitid_link == null || unitid_link == 1)){
		// 		return 'epc-ok';
		// 	}
		// 	if(totalydscheck >= totalydsorigin && totalydscheck > 0 && unitid_link == 3){
		// 		return 'epc-ok';
		// 	}
		// 	if(netweight >= grossweight && netweight > 0 && unitid_link == 4){
		// 		return 'epc-ok';
		// 	}
		// 	if(netweight_lbs >= grossweight_lbs && netweight_lbs > 0 && unitid_link == 5){
		// 		return 'epc-ok';
		// 	}
		// 	return 'epc-error';
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
	bind:{
		store: '{StockinD_Store}'
	},
	// columns: [
	// 	// {
    //     //     xtype: 'actioncolumn',
    //     //     width: 28,
    //     //     menuDisabled: true,
    //     //     sortable: false,
    //     //     align: 'center',
    //     //     items: [
    //     //         {
    //     //             iconCls: 'x-fa fas fa-bars violetIcon',
    //     //             handler: 'onMenu_Stockin_M_List_D_List'
    //     //         },            
    //     //     ],
	// 	// 	bind: {
	// 	// 		hidden: '{!isRecordNguyenLieu}',
	// 	// 	},
    //     // },
	// 	{
	// 		text: 'Mã NPL', 
	// 		flex: 1,
	// 		dataIndex: 'skuCode',
	// 		renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 			var val = value == 'null' ? "" : value;
	// 			metaData.tdAttr = 'data-qtip="' + val + '"';
	// 			return val;
	// 		},
	// 		items: {
	// 			xtype: 'textfield',
	// 			fieldStyle: "",
	// 			margin: 1,
	// 			reference: 'ValueFilterFieldMaNPL',
	// 			width: '99%',
	// 			enableKeyEvents: true,
	// 			listeners: {
	// 				keyup: 'onFilterValueMaNPLKeyup',
	// 				buffer: 500
	// 			}
	// 		}
	// 	},{
	// 		text: 'Tên NPL', 
	// 		dataIndex: 'skuname',
	// 		flex: 1,
	// 		renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 			var val = value == 'null' ? "" : value;
	// 			metaData.tdAttr = 'data-qtip="' + val + '"';
	// 			return val;
	// 		},
	// 		items: {
	// 			xtype: 'textfield',
	// 			fieldStyle: "",
	// 			margin: 1,
	// 			reference: 'ValueFilterFieldTenNPL',
	// 			width: '99%',
	// 			enableKeyEvents: true,
	// 			listeners: {
	// 				keyup: 'onFilterValueTenNPLKeyup',
	// 				buffer: 500
	// 			}
	// 		}
	// 	},{
	// 		text: 'Mô tả', 
	// 		dataIndex: 'sku_product_desc',
	// 		flex: 1,
	// 		renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 			var val = value == 'null' ? "" : value;
	// 			metaData.tdAttr = 'data-qtip="' + val + '"';
	// 			return val;
	// 		},
	// 	},{
	// 		text: 'Màu', 
	// 		dataIndex: 'sku_product_color',
	// 		width: 150,
	// 		renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 			var val = value == 'null' ? "" : value;
	// 			metaData.tdAttr = 'data-qtip="' + val + '"';
	// 			return val;
	// 		},
	// 	},{
	// 		text: 'Cỡ khổ', 
	// 		dataIndex: 'size_name',
	// 		width: 70
	// 	},{
	// 		text: 'ĐVT', 
	// 		dataIndex: 'unitid_link',
	// 		width: 70,
	// 		renderer: 'renderUnit'
	// 	},

	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL Y/C (M)', 
	// 		align:'right',
	// 		dataIndex: 'totalmet_origin',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuMet}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL kiểm (M)', 
	// 		align:'right',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		dataIndex: 'totalmet_check',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuMet}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL Y/C (Y)', 
	// 		align:'right',
	// 		dataIndex: 'totalydsorigin',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuYds}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL kiểm (Y)', 
	// 		align:'right',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		dataIndex: 'totalydscheck',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuYds}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL Y/C (KG)', 
	// 		align:'right',
	// 		dataIndex: 'grossweight',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuKg}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL kiểm (KG)', 
	// 		align:'right',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		dataIndex: 'netweight',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuKg}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL Y/C (lbs)', 
	// 		align:'right',
	// 		dataIndex: 'grossweight',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuLbs}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000.00',
	// 		text: 'SL kiểm (lbs)', 
	// 		align:'right',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		dataIndex: 'netweight',
	// 		width: 90,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieuLbs}',
	// 		},
	// 	},

	// 	{
	// 		xtype: 'numbercolumn',
	// 		format:'0,000',
	// 		text: 'Cây kiểm', 
	// 		align:'right',
	// 		dataIndex: 'totalpackagecheck',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 70,
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieu}',
	// 		},
	// 	},		
	// 	{
	// 		text: 'Danh sách LOT',
	// 		dataIndex: 'stockinDLot',
	// 		width: 150,
	// 		renderer: function(value, metaData, record, rowIdx, colIdx, store) {
	// 			if(value == null) value = '';
	// 			value = value.toUpperCase();
	// 			metaData.tdAttr = 'data-qtip="' + value + '"';
	// 			return value;
	// 		},
	// 		bind: {
	// 			hidden: '{!isRecordNguyenLieu}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		format: '0,000',
	// 		text: 'SL Y/C',
	// 		align: 'right',
	// 		dataIndex: 'totalpackage',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		width: 80,
	// 		bind: {
	// 			hidden: '{isRecordNguyenLieu}',
	// 		},
	// 	},
	// 	{
	// 		xtype: 'numbercolumn',
	// 		width: 90,
	// 		format: '0,000',
	// 		text: 'SL Nhập',
	// 		align: 'right',
	// 		summaryType: 'sum',
	// 		summaryRenderer: 'renderSum',
	// 		dataIndex: 'totalpackagecheck',
	// 		bind: {
	// 			hidden: '{isRecordNguyenLieu}',
	// 		},
	// 	},
	// ],

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

