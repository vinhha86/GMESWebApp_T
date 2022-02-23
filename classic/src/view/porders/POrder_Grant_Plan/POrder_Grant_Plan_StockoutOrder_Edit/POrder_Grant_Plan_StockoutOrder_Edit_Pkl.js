Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_Pkl', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    itemId: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    reference: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl',
    controller: 'POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [
        // {
        //     id: 'group',
        //     ftype: 'groupingsummary',
        //     groupHeaderTpl: '<b>Khoang: {name}</b>',
        //     hideGroupedHeader: false,
        //     enableGroupingMenu: false,
        // },
		{
			ftype: 'summary',
			dock: 'top'
		}
    ],
    bind:{
        store: '{Stockout_order_pkl_Store}',
    },
    columns: [
		{
			text: 'Khoang', 
			// width: 120,
			flex: 1,
			dataIndex: 'spaceString',
            sortable: false,
            menuDisabled: true,
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
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
			// width: 85,
			flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Số cây', 
			dataIndex: 'packageid',
			// width: 85,
			flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			xtype: 'numbercolumn',
			// format:'0,000.00',
			text: 'Khổ (cm)',
			align:'right',
			dataIndex: 'width_met',
			// width: 85,
			flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) {
					value = '';
				}else{
					value = value * 100;
					value = Ext.Number.roundToPrecision(value, 2);
				}
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			xtype: 'numbercolumn',
			// format:'0,000.00',
			text: 'Dài (m)', 
			align:'right',
			dataIndex: 'metorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) {
					value = '';
				}else{
					value = Ext.Number.roundToPrecision(value, 2);
				}
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			xtype: 'numbercolumn',
			// format:'0,000.00',
			text: 'Lbs', 
			align:'right',
			dataIndex: 'grossweight_lbs',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				if(value == null) {
					value = '';
				}else{
					value = Ext.Number.roundToPrecision(value, 2);
				}
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Trạng thái', 
			dataIndex: 'warehouseStatusString',
			// width: 85,
			flex: 1,
            sortable: false,
            menuDisabled: true,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
			// 	return value;
			// }
		},
		{
			text: 'Ngày tở',
			xtype: 'datecolumn',
			format: 'd/m/Y',
			dataIndex: 'date_check',
            flex: 1,
            sortable: false,
            menuDisabled: true,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
			// 	return value;
			// }
		},
	],
});

