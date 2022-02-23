Ext.define('GSmartApp.view.balance.Balance_D_Pcontract', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_D_Pcontract',
	id: 'Balance_D_Pcontract',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
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
		store: '{SKUBalanceStore}'
	},
	columns: [
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
			locked: true
		},
		{
			text: 'Màu NPL',
			dataIndex: 'mat_sku_color_name',
			width: 150,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
			}
		},
		{
			text: 'Thành phần vải',
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
			width: 100,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value == 'ALL' ? "" : value;
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
				if (value == 0) return "";
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
		}, {
			text: 'SL ĐH',
			dataIndex: 'mat_sku_product',
			// align:'right',
			width: 70,
			renderer: function (value, metaData, record) {
				if (value == 0) return "";
				return Ext.util.Format.number(value, '0,000')
			}
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Nhu cầu ĐH',
			align: 'right',
			dataIndex: 'mat_sku_demand_dh',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80
		},
		{
			text: 'SL SX',
			hidden: true,
			dataIndex: 'mat_sku_product_total',
			// align:'right',
			width: 70,
			renderer: function (value, metaData, record) {
				if (value == 0) return "";
				return Ext.util.Format.number(value, '0,000')
			}
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			hidden: true,
			text: 'Nhu cầu SX',
			align: 'right',
			dataIndex: 'mat_sku_demand',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 80
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
			format: '0,000.00',
			text: 'Nhập kho',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockin',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Y/C xuất',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout_order',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format: '0,000.00',
			text: 'Xuất kho',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'mat_sku_stockout',
			width: 80
		},
		{
			xtype: 'numbercolumn',
			format: '0,000',
			text: 'Tồn',
			align: 'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'in_stock',
			width: 80
		},
	],
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		border: true,
		height: 45,
		style: "background-color : white",
		items: [
			{
				xtype: 'combo',
				width: 400,
				margin: 3,
				bind: {
					store: '{PContractProductStore}',
					value: '{IdProduct}',
					readOnly: '{isReadOnlycmbSanPham}'
				},
				triggerAction: 'all',
				fieldLabel: 'Sản phẩm',
				labelWidth: 80,
				itemId: 'cmbSanPham',
				queryMode: 'local',
				anyMatch: true,
				valueField: 'productid_link',
				displayField: 'productBuyerCode'
			},
			{
				xtype: 'button',
				text: 'Tính cân đối',
				iconCls: 'x-fa fa-calculator',
				handler: 'onCalBalance_OneProduct'
			}
		],
		bind: {
			hidden: '{isHiddenbalance == null ? false : isHiddenbalance}'
		}
	}],
});

