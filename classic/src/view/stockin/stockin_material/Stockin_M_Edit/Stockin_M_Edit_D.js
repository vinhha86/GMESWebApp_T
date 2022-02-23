Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_Edit_D',
	itemId: 'Stockin_M_Edit_D',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_M_Edit_D_Controller',
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
        getRowClass: function(record, index) {
            var c = record.get('status');
			var unitid_link = record.get('unitid_link');

			var totalmet_origin = record.get('totalmet_origin') == null ? 0 : record.get('totalmet_origin');
			var totalmet_check = record.get('totalmet_check') == null ? 0 : record.get('totalmet_check');
			var totalydsorigin = record.get('totalydsorigin') == null ? 0 : record.get('totalydsorigin');
			var totalydscheck = record.get('totalydscheck') == null ? 0 : record.get('totalydscheck');
			var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
			var netweight = record.get('netweight') == null ? 0 : record.get('netweight');
			var grossweight_lbs = record.get('grossweight_lbs') == null ? 0 : record.get('grossweight_lbs');
			var netweight_lbs = record.get('netweight_lbs') == null ? 0 : record.get('netweight_lbs');

			if(
				totalmet_origin == 0
				&& totalmet_check == 0
				&& grossweight == 0
				&& netweight == 0
				&& totalydsorigin == 0
				&& totalydscheck == 0
				&& grossweight_lbs == 0
				&& netweight_lbs == 0
			){
				return 'epc-ok';
			}
			if(totalmet_check >= totalmet_origin && totalmet_check >= 0 && (unitid_link == null || unitid_link == 1)){
				return 'epc-ok';
			}
			if(totalydscheck >= totalydsorigin && totalydscheck >= 0 && unitid_link == 3){
				return 'epc-ok';
			}
			if(netweight >= grossweight && netweight >= 0 && unitid_link == 4){
				return 'epc-ok';
			}
			if(netweight_lbs >= grossweight_lbs && netweight_lbs >= 0 && unitid_link == 5){
				return 'epc-ok';
			}
			return 'epc-error';
        }                     
    },
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onDItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
	bind:{
		store: '{StockinD_Store}'
	},
	columns: [
		{
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_Stockin_M_Edit_D_List'
                },            
            ]
        },
		{
			text: 'Mã NPL', 
			dataIndex: 'skuCode',
			// width: 100,
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
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			}
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			// width: 100,
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
		},{
			text: 'Mô tả', 
			dataIndex: 'sku_product_desc',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'sku_product_color',
			width: 150
		},{
			text: 'Cỡ khổ', 
			dataIndex: 'size_name',
			width: 70
		},
		{
			text: 'ĐVT', 
			dataIndex: 'unitid_link',
			width: 70,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = 1;
				if(value == 1){
					return 'MÉT';
				}
				if(value == 3){
					return 'YARD'
				}
				if(value == 4){
					return 'KG';
				}
				if(value == 5){
					return 'POUND'
				}
				return "";
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (M)', 
			align:'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (M)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 85,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (Y)', 
			align:'right',
			dataIndex: 'totalydsorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (Y)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalydscheck',
			width: 85,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (KG)', 
			align:'right',
			dataIndex: 'grossweight',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isKgColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (KG)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'netweight',
			width: 85,
			bind: {
				hidden: '{isKgColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL Y/C (lbs)', 
			align:'right',
			dataIndex: 'grossweight_lbs',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80,
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL kiểm (lbs)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'netweight_lbs',
			width: 85,
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây kiểm', 
			align:'right',
			dataIndex: 'totalpackagecheck',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70,
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
		},
		{
			text: 'Danh sách LOT', 
			// dataIndex: 'lot_list',
			dataIndex: 'stockinDLot',
			width: 150,
			renderer: function(value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) value = '';
				value = value.toUpperCase();
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
		}
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		items: [
			{
				margin:'0 0 0 5',
				xtype: 'button',
				iconCls: 'x-fa fa-angle-double-up',
				itemId: 'btnThuGon',
				bind: {
					hidden: '{IsformMaster}'
				}
			}, 
			{
				margin:'0 0 0 5',
				xtype: 'button',
				itemId: 'btnMoRong',
				iconCls: 'x-fa fa-angle-double-down',
				bind: {
					hidden: '{!IsformMaster}'
				}
			}, 
			{
				labelWidth: 120,
				margin:'0 5 5 5',
				xtype: 'combobox',
				editable: false,
				fieldLabel: 'Phương pháp nhập',
				bind: {
					store: '{StockinGroupStore}',
					value: '{groupstockin}'
				},
				width: 300,
				displayField: 'name',
				valueField: 'id',
				itemId: 'cmbStockinGroup'
			},  {
				labelWidth: 90,
				margin:'0 5 5 5',
				xtype: 'combobox',
				reference: 'device',
				fieldLabel: 'Thiết bị RFID',
				bind: {
					store: '{DeviceInvStore}',
					hidden: '{isRFIDHidden}'
				},
				width: 300,
				displayField: 'name',
				valueField: 'id',
				listeners: {
					change: 'onDeviceChange'
				}
			}, {
				margin:'0 5 5 5',
				text: "Start",
				iconCls: 'x-fa fa-play',
				xtype: 'button',
				itemId: 'btnStart',
				bind: {
					disabled: '{isStart}',
					userCls: '{clsbtnStart}',
					hidden: '{isRFIDHidden}'
				}
			}, {
				margin:'0 5 5 5',
				text: "Stop",
				iconCls: 'x-fa fa-stop',
				xtype: 'button',
				itemId: 'btnStop',
				bind: {
					userCls: 'clsbtnStop',
					hidden: '{isRFIDHidden}'
				}
			},
			{
				xtype: 'combo',
				margin: '0 5 0 5',
				itemId:'skucode',
				fieldLabel: 'Mã NPL',
				width: 350,
				labelWidth: 70,
				hideLabel: false,			
				bind:{
					// store: '{SKUStore}',
					hidden: '{isBarcodeHidden}',
					// value: '{skucode}'
				},
				store: {
					type: 'Sku_AutoComplete',
					// pageSize: 10
				},
				displayField: 'code',
				valueField: 'id',
				listConfig: {
					loadingText: 'Tải mã NPL...',
					emptyText: 'Không có mã NPL phù hợp.',
				},
				anyMatch: true,
				minChars: 2,
				queryMode: 'remote',
				queryParam: 'code',
				enableKeyEvents : true,
				listeners: {
					keypress: 'onPressEnterSkucode',
				},
			},
			{
				tooltip: 'Thêm NPL',
				margin: '0 0 0 5',
				iconCls: 'x-fa fa-plus',
				weight: 30,
				itemId: 'btnThemSP',
				bind:{
					hidden: '{isBarcodeHidden}',
				},
			},
			{
				tooltip: 'Tìm nguyên phụ liệu',
				margin: '0 5 0 5',
				itemId: 'btnTimNPL',
				iconCls: 'x-fa fa-search',
				weight: 30,			
				bind:{
					hidden: '{isManualHidden}',
				},
			},
		// {
		// 	xtype: 'textfield',
		// 	margin: '0 5 0 5',
		// 	itemId:'ordercode',
		// 	fieldLabel: 'Mã lệnh SX:',
		// 	width: 200,
		// 	labelWidth: 80,
		// 	hideLabel: false,			
        //     bind:{
		// 		disabled: '{isEdit}',
		// 		value: '{stockin.pordercode}'
        //     }
		// 	// fieldStyle: {
		// 	// 	textTransform: "uppercase"
		// 	// },
		// 	// enableKeyEvents: true,
		// 	// listeners: {
		// 	// 	// change: function (obj, newValue) {
		// 	// 	//     //console.log(newValue);
		// 	// 	//     obj.setRawValue(newValue.toUpperCase());
		// 	// 	// },
		// 	// 	keyup: 'onSkuCodeKeyup',
		// 	// 	buffer: 100
		// 	// }    
		// },
		// {
		// 	tooltip: 'Tải danh sách sản phẩm',
		// 	margin: '0 0 0 5',
		// 	//text: 'Thêm thẻ vải',
		// 	iconCls: 'x-fa fa-plus',
		// 	weight: 30,
		// 	itemId: 'btnTaiSP',			
        //     bind:{
        //         hidden: '{isEdit}'
        //     }
		// 	// handler: 'onAddItemTap'
		// },
		// {
		// 	tooltip: 'Tìm lệnh',
		// 	margin: '0 5 0 5',
		// 	itemId: 'btnTimLenh',
		// 	//text: 'Thêm thẻ vải',
		// 	iconCls: 'x-fa fa-search',
		// 	weight: 30,			
        //     bind:{
        //         hidden: '{isEdit}'
        //     }
		// 	// handler: 'onSkuSearchTap'
		// } 		
	]
	}]
});

