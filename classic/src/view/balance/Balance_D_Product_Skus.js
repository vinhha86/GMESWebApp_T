Ext.define('GSmartApp.view.balance.Balance_D_Product_Skus', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_D_Product_Skus',
	id: 'Balance_D_Product_Skus',
	controller: 'Balance_D_Product_Skus_Controller',
	viewModel: {
		type: 'Balance_D_Product_Skus_ViewModel'
	},
	columnLines: true,
	rowLines: true,
	border: true,
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false
	},
	features: [
		{
			id: 'group',
			ftype: 'groupingsummary',
			groupHeaderTpl: '<b>PO-Line: {name}</b>',
			hideGroupedHeader: false,
			enableGroupingMenu: false
		},
		{
			ftype: 'summary',
			dock: 'bottom'
		}
	],
	bind: '{Balance_D_Product_Sku}',
	columns: [
		{
			text: 'SKU',
			flex: 1,
			dataIndex: 'p_sku_code'
		},
		{
			text: 'Màu',
			dataIndex: 'p_sku_color',
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Size',
			dataIndex: 'p_sku_size',
			width: 60,
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL ĐH',
			align: 'right',
			dataIndex: 'p_amount_dh',
			summaryType: 'sum',
			summaryRenderer: function (value, summaryData, dataIndex) {
				if (null == value) value = 0;
				return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
			},
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL SX',
			align: 'right',
			dataIndex: 'p_amount',
			summaryType: 'sum',
			summaryRenderer: function (value, summaryData, dataIndex) {
				if (null == value) value = 0;
				return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
			},
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format: '0.0000',
			text: 'Định mức',
			align: 'right',
			dataIndex: 'p_bom_amount',
			width: 70
		},
		{
			xtype: 'numbercolumn',
			format: '0.00',
			text: '%TH',
			align: 'right',
			dataIndex: 'p_bom_lostratio',
			width: 70
		},
		{
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Nhu cầu',
			align: 'right',
			dataIndex: 'p_bom_demand',
			summaryType: 'sum',
			summaryRenderer: function (value, summaryData, dataIndex) {
				if (null == value) value = 0;
				return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
			},
			width: 100
		},
	],
	// dockedItems: [{
	//     dock: 'bottom',
	//     layout: 'hbox',
	//     items: [{
	//         xtype: 'button',
	//         text: 'Thoát',
	//         itemId: 'btnThoat',
	//         iconCls: 'x-fa fa-window-close',
	//         margin: 5
	//     }
	//     ]
	// }] 
});

