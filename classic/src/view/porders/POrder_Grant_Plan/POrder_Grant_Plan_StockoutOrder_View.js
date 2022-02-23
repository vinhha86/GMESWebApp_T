Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_View',
    itemId: 'POrder_Grant_Plan_StockoutOrder_View',
    reference: 'POrder_Grant_Plan_StockoutOrder_View',
    controller: 'POrder_Grant_Plan_StockoutOrder_View_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>NPL: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store: '{Stockout_order_Store}',
    },
    columns: [
		{
			xtype: 'actioncolumn',
			width: 50,
			menuDisabled: true,
			sortable: false,
			align: 'center',
			items: [
				{
                    // text:  'Tạo lệnh cấp vải',
					tooltip: 'Chi tiết lệnh xuất vải',
					iconCls: 'x-fa fas fa-edit',
					handler: 'onChiTietLenhCapVai'
				},
			]
		},
		// {
		// 	text: 'Mã lệnh cấp vải', 
		// 	// width: 120,
		// 	flex: 1,
		// 	dataIndex: 'stockout_order_code',
        //     sortable: false,
        //     menuDisabled: true,
		// 	renderer: function (value, metaData, record, rowIdx, colIdx, store) {
		// 		var val = value == 'null' ? "" : value;
		// 		metaData.tdAttr = 'data-qtip="' + val + '"';
		// 		return val;
		// 	},
		// 	// items: {
		// 	// 	xtype: 'textfield',
		// 	// 	fieldStyle: "",
		// 	// 	margin: 1,
		// 	// 	reference: 'ValueFilterFieldMaNPL',
		// 	// 	width: '99%',
		// 	// 	enableKeyEvents: true,
		// 	// 	listeners: {
		// 	// 		keyup: 'onFilterValueMaNPLKeyup',
		// 	// 		buffer: 500
		// 	// 	}
		// 	// }
		// },
		{
			text: 'Mã SP(Buyer)', 
			dataIndex: 'porder_product_buyercode',
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
			text: 'Mã NPL', 
			dataIndex: 'skuCode',
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
			text: 'Tên NPL', 
			dataIndex: 'skuName',
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
			dataIndex: 'skuDescription',
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
			text: 'Màu', 
			dataIndex: 'skuColor',
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
			text: 'Cỡ/khổ', 
			dataIndex: 'skuSize',
			width: 80,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{ 
            xtype: 'datecolumn',
            format: 'd/m/y',
            header: 'Ngày tở', 
            dataIndex: 'date_to_vai_yc', 
			width: 80,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
        },
		{ 
            xtype: 'datecolumn',
            format: 'd/m/y',
            header: 'Ngày xuất', 
            dataIndex: 'date_xuat_yc', 
			width: 80,
			// flex: 1,
            sortable: false,
            menuDisabled: true,
        },
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây Y/C', 
			align:'right',
			dataIndex: 'cayYc',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 65,
            // flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met Y/C', 
			align:'right',
			dataIndex: 'metYc',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 100,
            // flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây tở', 
			align:'right',
			dataIndex: 'cayTo',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 65,
            // flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met tở', 
			align:'right',
			dataIndex: 'metTo',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 100,
            // flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Cây xuất', 
			align:'right',
			dataIndex: 'cayXuat',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 65,
            // flex: 1,
            sortable: false,
            menuDisabled: true,
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Met xuất', 
			align:'right',
			dataIndex: 'metXuat',
			// summaryType: 'sum',
			// summaryRenderer: 'renderSum',
			width: 100,
            // flex: 1,
            sortable: false,
            menuDisabled: true,	
		},
	],
	dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
				{
					margin: 3,
					xtype:'button',
					text:  'Thoát',
					iconCls: 'x-fa fa-window-close',
					itemId: 'btnThoat'
				},
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Tạo lệnh xuất vải',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnTaoLenhCapVai'
                }
            ]
        }
    ],
});

