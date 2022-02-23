Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_D',
    itemId: 'POrder_Grant_Plan_StockoutOrder_Edit_D',
    reference: 'POrder_Grant_Plan_StockoutOrder_Edit_D',
    controller: 'POrder_Grant_Plan_StockoutOrder_Edit_D_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind:{
        store: '{Stockout_order_d_store}',
    },
    columns: [
		{
			text: 'Mã NPL', 
			// width: 120,
			flex: 1,
			dataIndex: 'skucode',
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
			text: 'Tên NPL', 
			dataIndex: 'skuname',
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
			text: 'Mô tả', 
			dataIndex: 'sku_product_desc',
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
			text: 'Màu', 
			dataIndex: 'color_name',
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
			text: 'Cỡ/Khổ', 
			dataIndex: 'coKho',
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
			format:'0,000.00',
			text: 'Met Y/C', 
			align:'right',
			dataIndex: 'totalmet',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			// width: 70,
            flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{ 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày tở Y/C', 
            dataIndex: 'date_to_vai_yc',
            flex: 1,
            sortable: false,
            menuDisabled: true,
            editor:{
                completeOnEnter: true,
                field: {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    pickerAlign: 'tr-br?',
                    // listeners: {
                    //     focusenter: 'onDateFocus',
                    //     change: 'onDateChange',
                    //     focusleave: 'onFocusLeave'
                    // }
                }
            }
        },
		{ 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày xuất Y/C', 
            dataIndex: 'date_xuat_yc', 
            flex: 1,
            sortable: false,
            menuDisabled: true,
            editor:{
                completeOnEnter: true,
                field: {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    pickerAlign: 'tr-br?',
                    // listeners: {
                    //     focusenter: 'onDateFocus',
                    //     change: 'onDateChange',
                    //     focusleave: 'onFocusLeave'
                    // }
                }
            }
        },
	],
});