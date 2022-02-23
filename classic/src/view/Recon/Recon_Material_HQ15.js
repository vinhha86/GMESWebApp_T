Ext.define('GSmartApp.view.Recon.Recon_Material_HQ15', {
	extend: 'Ext.grid.Panel',
	xtype: 'Recon_Material_HQ15',
	id: 'Recon_Material_HQ15',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'grouping',
		groupHeaderTpl: '{name}',
		collapseTip: "",
		expandTip: ""
	}],
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false
	},
	// selModel: {
	//     selType: 'checkboxmodel',
	// },
	bind: {
		store: '{ReconMaterial_Store}'
	},
	columns: [
		{
			text: 'STT',
			width: 40,
			xtype: 'rownumberer',
			align: 'center'
		},
		{
			text: 'Mã NPL',
			width: 150,
			dataIndex: 'mat_sku_code',
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
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
			},
		},
		{
			text: 'Tên NPL',
			flex: 1,
			dataIndex: 'mat_sku_name',
		},
		{
			text: 'Màu NPL',
			dataIndex: 'mat_sku_color_name',
			width: 100,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
			}
		},
		{
			text: 'TP vải',
			dataIndex: 'mat_sku_desc',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'Cỡ khổ',
			dataIndex: 'mat_sku_size_name',
			width: 85,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
			}
		},
		{
			text: 'ĐVT',
			dataIndex: 'mat_sku_unit_name',
			width: 60
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'SL Y/C',
			align: 'right',
			dataIndex: 'mat_sku_demand',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 85
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Tồn đầu kỳ',
			align: 'right',
			dataIndex: 'mat_sku_demand_dh',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 85
		},
		{//NPL da nhap ve kho
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Nhập trong kỳ',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockin',
			width: 85
		},
		{//NPL da xuat sang sx
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Xuất SX',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 85
		},
		{//NPL xuat theo san pham xuat kho
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Xuất khác',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_byproduct_stockout',
			width: 85
		},
		{//NPL con ton trong kho
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Tồn cuối kỳ',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'in_stock',
			width: 85
		},
	],
});

