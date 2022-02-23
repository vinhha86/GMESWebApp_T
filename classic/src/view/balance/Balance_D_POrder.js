Ext.define('GSmartApp.view.balance.Balance_D_POrder', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_D_POrder',
	id: 'Balance_D_POrder',
	controller: 'Balance_D_POrder_Controller',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
	columnLines: true,
	rowLines: true,
	border: true,
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip:""
    }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false                
    },
	// selModel: {
    //     selType: 'checkboxmodel',
    // },
	bind:{
		store: '{SKUBalanceStore_Mat}'
	},
	columns: [
		{
			text: 'Mã NPL', 
			width: 120,
			dataIndex: 'mat_sku_code',
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
		},
		{
			text: 'Màu NPL', 
			dataIndex: 'mat_sku_color_name',
			width: 85,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Thành phần vải',
			dataIndex: 'mat_sku_desc',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'ĐVT', 
			dataIndex: 'mat_sku_unit_name',
			width: 70
		},
		{
			text: 'Định mức',
			dataIndex: 'mat_sku_bom_amount',
			width: 70,
			xtype: 'numbercolumn',
			format: '0.0000',
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0.0000')
			}
		},				
		{
			text: '%TH',
			dataIndex: 'mat_sku_bom_lostratio',
			width: 55,
			xtype: 'numbercolumn',
			format: '0.00',
			// renderer: function (value, metaData, record) {
			// 	return value+" %";
			// }
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Nhu cầu', 
			align:'right',
			dataIndex: 'mat_sku_demand',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 70
		},
		// {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Đặt hàng', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'mat_sku_invoice',
		// 	width: 80
		// },
		// {
		// 	text:'Dự kiến về',
		// 	dataIndex:'mat_sku_invoice_date',
		// 	renderer: Ext.util.Format.dateRenderer('d/m/y'),
		// 	width: 75
		// },
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Nhập kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockin',
			width: 70
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Y/C xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout_order',
			width: 70
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Xuất kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 70
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Tồn', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'in_stock',
			width: 70
		},
		{
			header: 'Năng lực', 
			headerWrap: false,
			dataIndex: 'ability',
			align:'right',
			width: 70,
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0,000')
			}
		},
	],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'button',
            itemId: 'btnAddStockoutOrder',
            ui: 'header',
            margin: '10 5 0 0',
            tooltip: 'Tạo yêu cầu xuất',
            text: 'Yêu cầu xuất NPL',
            iconCls: 'x-fa fa-plus'
        }
        ]
    }] 
});

