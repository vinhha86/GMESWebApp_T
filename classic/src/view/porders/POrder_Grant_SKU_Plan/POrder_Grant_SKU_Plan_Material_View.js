Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Material_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_SKU_Plan_Material_View',
    itemId: 'POrder_Grant_SKU_Plan_Material_View',
    reference: 'POrder_Grant_SKU_Plan_Material_View',
    controller: 'POrder_Grant_SKU_Plan_Material_View_Controller',
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
        // store: '{POrderGrant_SKU_Plan_MaterialStore}',
        store: '{SKUBalanceStore}',
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
			width: 100,
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
			width: 100
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
			width: 100
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Y/C xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout_order',
			width: 100
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Xuất kho', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 100
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'Tồn', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'in_stock',
			width: 100
		},
		{
			header: 'Năng lực', 
			headerWrap: false,
			dataIndex: 'ability',
			align:'right',
			width: 100,
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				return Ext.util.Format.number(value, '0,000')
			}
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
                    text:  'Tính cân đối',
                    iconCls: 'x-fa fa-refresh',
                    itemId: 'btnCanDoi'
                }
            ]
        }
    ],
});

