Ext.define('GSmartApp.view.Recon.Recon_Product_HQ15a', {
	extend: 'Ext.grid.Panel',
	xtype: 'Recon_Product_HQ15a',
	id: 'Recon_Product_HQ15a',
	columnLines: true,
	rowLines: true,
	border: true,
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
	viewConfig: {
		enableTextSelection: true,
		stripeRows: false
	},
	// selModel: {
	//     selType: 'checkboxmodel',
	// },
	bind: {
		store: '{ReconProduct_Store}'
	},
	columns: [
		{
			text: 'STT',
			width: 40,
			xtype: 'rownumberer',
			align: 'center'
		},
		{
			text: 'Mã SP',
			width: 120,
			dataIndex: 'product_code',
		},
		{
			text: 'Tên SP',
			flex: 1,
			dataIndex: 'product_name',
		},
		{
			text: 'Mầu',
			width: 150,
			dataIndex: 'mausanpham',
		},
		{
			text: 'Cỡ',
			width: 70,
			dataIndex: 'cosanpham',
		},
		{
			text: 'ĐVT',
			width: 70,
			dataIndex: 'unit_name',
		},
		{
			text: 'SL Y/C',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_porder',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Tồn đầu kỳ',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_onhand_begin',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Nhập trong kỳ',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_stockin',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Đổi mục đích',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_changetarget',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Xuất khẩu',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_stockout',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Xuất khác',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_stockout_other',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
		{
			text: 'Tồn cuối kỳ',
			align: 'right',
			width: 90,
			dataIndex: 'pquantity_onhand_end',
			renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
				return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum'
		},
	],
	// dockedItems: [{
	// 	dock: 'top',
	// 	xtype:'toolbar',
	// 	items: [{
	// 		xtype:'datefield',
	// 		labelWidth: 0,
	// 		emptyText: 'Từ ngày',
	// 		itemId: 'recondate_from',
	// 		editable: false,
	// 		margin: '5 5 5 5',
    //         bind: {
    //             value: '{recondate_from}'
    //         },
	// 		width: 110,
    //         format:'d/m/y'
	// 	},{
	// 		xtype:'datefield',
	// 		labelWidth: 0,
	// 		emptyText: 'Đến ngày',
	// 		itemId: 'recondate_to',
	// 		editable: false,
	// 		margin: '5 5 5 0',
	// 		width: 110,
    //         bind: {
    //             value: '{recondate_to}'
    //         },
    //         format:'d/m/y'
	// 	},
	// 	{
    //         xtype: 'button',
	// 		text: 'Tính quyết toán',
    //         margin: 5,
    //         iconCls: 'x-fa fa-calculator',
    //         itemId: 'btnRecon_Calculate'
    //     },
    // ]
	// }]
});

