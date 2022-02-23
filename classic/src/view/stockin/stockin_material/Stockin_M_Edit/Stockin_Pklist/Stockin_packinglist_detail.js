Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_detail',
	id: 'Stockin_packinglist_detail',
	cls: 'Stockin_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.plugin.Exporter',
	],
	controller: 'Stockin_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onPackingListItemEdit',
    //             // beforeedit: 'onPriceDItemBeforeEdit'
    //         }             
    //     }
    // },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},

	columns: [
		{
			xtype: 'actioncolumn',
			width: 60,
			menuDisabled: true,
			sortable: false,
			align: 'center',
			items: [{
				iconCls: 'x-fa fas fa-trash',
				tooltip: "Xóa Lot vải",
				handler: 'onDeleteLot'
			},{
				iconCls: 'x-fa fas fa-random',
				tooltip: "Đổi loại nguyên phụ liệu",
				handler: 'onChangeSku'
			}]
		},
		{
			text: 'Số Lot',
			dataIndex: 'lot_number',
			sortable: true,
			width: 200,
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
			renderer: 'renderLot'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Dài phiếu (M)',
			dataIndex: 'totalmet',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Dài kiểm (M)',
			dataIndex: 'totalmetcheck',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Dài phiếu (Y)',
			dataIndex: 'totalyds',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Dài kiểm (Y)',
			dataIndex: 'totalydscheck',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Cân phiếu',
			dataIndex: 'grossweight',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isKgColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Cân kiểm',
			dataIndex: 'grossweight_check',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isKgColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Lbs phiếu',
			dataIndex: 'grossweight_lbs',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'Lbs kiểm',
			dataIndex: 'grossweight_lbs_check',
			sortable: true,
			width: 150,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL yêu cầu',
			dataIndex: 'totalpackage',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL xếp khoang',
			dataIndex: 'totalpackagecheck',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL kiểm',
			dataIndex: 'totalpackagepklist',
			sortable: true,
			width: 100,
			align:'end',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
		{
			text: 'DS cây vải chưa kiểm',
			dataIndex: 'list_not_check',
			sortable: true,
			flex: 1,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				// return val;
				return '<div style="white-space:normal !important;">'+ val +'</div>';;
			},
		},
	],
	plugins: [
		{
			ptype: 'rowwidget',
			id: 'rowwidget2',
			// itemId: 'rowwidget2',
			widget:
			{
				xtype: 'grid',
				itemId: 'level2',
				features: [{
					ftype: 'summary',
					dock: 'bottom'
				}],
				viewConfig: {
					stripeRows: false
				},
				bind: {
					store: '{record.stockin_packinglist}'
				},
				columns: [
					{
						xtype: 'actioncolumn',
						width: 30,
						menuDisabled: true,
						sortable: false,
						align: 'center',
						items: [{
							iconCls: 'x-fa fas fa-trash',
							tooltip: "Xóa cây vải",
							handler: 'onDeletePklist'
						}]
					},
					{
						text: 'Cây số', 
						dataIndex: 'packageid',
						width: 50,
					},
					{
						text: 'Khổ (cm)', 
						dataIndex: 'width_met',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 100, '0,000.00');
						},
						bind: {
							hidden: '{isCmColumnHidden}',
						},
					},
					{
						text: 'Khổ thực tế (cm)', 
						dataIndex: 'width_met_check',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 100, '0,000.00');
						},
						bind: {
							hidden: '{isCmColumnHidden}',
						},
					},
					{
						text: 'Khổ (inch)', 
						dataIndex: 'width_yds',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 36, '0,000.00');
						},
						bind: {
							hidden: '{isInchColumnHidden}',
						},
					},
					{
						text: 'Khổ thực tế (inch)', 
						dataIndex: 'width_yds_check',
						flex: 1,
						align:'right',
						renderer: function (value, metaData, record) {
							if(value == 0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
							return Ext.util.Format.number(value * 36, '0,000.00');
						},
						bind: {
							hidden: '{isInchColumnHidden}',
						},
					},
					{
						text: 'Dài phiếu (m)', 
						dataIndex: 'met_origin',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isMetColumnHidden}',
						},
					},
					{
						text: 'Dài kiểm (m)', 
						dataIndex: 'met_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isMetColumnHidden}',
						},
					},
					{
						text: 'Dài phiếu (y)', 
						dataIndex: 'ydsorigin',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isYdsColumnHidden}',
						},
					},
					{
						text: 'Dài kiểm (y)', 
						dataIndex: 'ydscheck',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isYdsColumnHidden}',
						},
					},
					{
						text: 'Cân phiếu', 
						dataIndex: 'grossweight',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isKgColumnHidden}',
						},
					},
					{
						text: 'Cân kiểm', 
						dataIndex: 'grossweight_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isKgColumnHidden}',
						},
					},
					{
						text: 'Lbs phiếu', 
						dataIndex: 'grossweight_lbs',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isLbsColumnHidden}',
						},
					},
					{
						text: 'Lbs kiểm', 
						dataIndex: 'grossweight_lbs_check',
						flex: 1,
						align:'right',
						summaryType: 'sum',
						summaryRenderer: 'renderSum',
						renderer: function (value, metaData, record) {
							if(value ==0 || value == null) return "";
							metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							return Ext.util.Format.number(value, '0,000.00');
						},
						bind: {
							hidden: '{isLbsColumnHidden}',
						},
					},
					// {
					// 	text: 'Ghi chú', 
					// 	dataIndex: 'comment',
					// 	flex: 2,
					// 	editor:{
					// 		xtype:'textfield',
					// 		selectOnFocus: true
					// 	}
					// },
					{
						text: 'Dãy, tầng, khoang', 
						dataIndex: 'spaceepc_link',
						flex: 2,
						renderer: function (value, metaData, record) {
							// metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
							// return Ext.util.Format.number(value, '0,000.00');
							var result = '';
							if(value == null || value == ''){
								result = 'Thiếu thông tin khoang chứa';
								metaData.tdCls =  'cellYellow';
								return result;
							}
							result = record.get('row') + '-' + record.get('space') + '-' + record.get('floor');
							return result;
						},
					},
				],
			}
		}
	],
	viewConfig: {
		listeners: {
			expandbody: 'onexpandbodySub',
			collapsebody: 'oncollapsebodySub',
		}
	}

	// // old
	// columns: [
	// 	{
	// 		text: 'Mã vải',
	// 		dataIndex: 'skuCode',
	// 		sortable: true,
	// 		flex: 1,
    //         // summaryType: 'count',
    //         // summaryRenderer: 'renderCount',
	// 		renderer: 'renderStockinD'
	// 	},
	// ],
    // plugins: [
	// 	{
	// 		ptype: 'gridexporter',
	// 		// gridexporter: true
	// 	},
	// 	{
	// 		ptype: 'rowwidget',
	// 		id: 'rowwidget1',
	// 		// itemId: 'rowwidget1',
	// 		widget:
	// 		{
	// 			xtype: 'grid',
	// 			itemId: 'level1',
	// 			features: [{
	// 				ftype: 'summary',
	// 				dock: 'bottom'
	// 			}],
	// 			viewConfig: {
	// 				stripeRows: false
	// 			},
	// 			selModel: {
	// 				selType: 'rowmodel',
	// 				mode: 'SINGLE'
	// 			},
	// 			bind: {
	// 				store: '{record.stockin_lot}'
	// 			},
	// 			columns: [
	// 				{
	// 					xtype: 'actioncolumn',
	// 					width: 30,
	// 					menuDisabled: true,
	// 					sortable: false,
	// 					align: 'center',
	// 					items: [{
	// 						iconCls: 'x-fa fas fa-random',
	// 						tooltip: "Đổi loại nguyên phụ liệu",
	// 						handler: 'onChangeSku'
	// 					}]
	// 				},
	// 				{
	// 					text: 'Số Lot',
	// 					dataIndex: 'lot_number',
	// 					sortable: true,
	// 					width: 200,
	// 					summaryType: 'count',
	// 					summaryRenderer: 'renderCount',
	// 					renderer: 'renderLot'
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Dài phiếu (M)',
	// 					dataIndex: 'totalmet',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isMetColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Dài kiểm (M)',
	// 					dataIndex: 'totalmetcheck',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isMetColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Dài phiếu (Y)',
	// 					dataIndex: 'totalyds',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isYdsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Dài kiểm (Y)',
	// 					dataIndex: 'totalydscheck',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isYdsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Cân phiếu',
	// 					dataIndex: 'grossweight',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isKgColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Cân kiểm',
	// 					dataIndex: 'grossweight_check',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isKgColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Lbs phiếu',
	// 					dataIndex: 'grossweight_lbs',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isLbsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000.00',
	// 					text: 'Lbs kiểm',
	// 					dataIndex: 'grossweight_lbs_check',
	// 					sortable: true,
	// 					width: 150,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderSum',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 					bind: {
	// 						hidden: '{isLbsColumnHidden}',
	// 					},
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000',
	// 					text: 'SL yêu cầu',
	// 					dataIndex: 'totalpackage',
	// 					sortable: true,
	// 					width: 100,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderCount',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000',
	// 					text: 'SL xếp khoang',
	// 					dataIndex: 'totalpackagecheck',
	// 					sortable: true,
	// 					width: 100,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderCount',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 				},
	// 				{
	// 					xtype: 'numbercolumn',
	// 					format:'0,000',
	// 					text: 'SL kiểm',
	// 					dataIndex: 'totalpackagepklist',
	// 					sortable: true,
	// 					width: 100,
	// 					align:'end',
	// 					summaryType: 'sum',
	// 					summaryRenderer: 'renderCount',
	// 					// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 					// 	var val = value == 'null' ? "" : value;
	// 					// 	metaData.tdAttr = 'data-qtip="' + val + '"';
	// 					// 	return val;
	// 					// },
	// 				},
	// 				{
	// 					text: 'DS cây vải chưa kiểm',
	// 					dataIndex: 'list_not_check',
	// 					sortable: true,
	// 					flex: 1,
	// 					renderer: function (value, metaData, record, rowIdx, colIdx, store) {
	// 						var val = value == 'null' ? "" : value;
	// 						metaData.tdAttr = 'data-qtip="' + val + '"';
	// 						// return val;
	// 						return '<div style="white-space:normal !important;">'+ val +'</div>';;
	// 					},
	// 				},
	// 			],
	// 			plugins: [
	// 				{
	// 					ptype: 'rowwidget',
	// 					id: 'rowwidget2',
	// 					// itemId: 'rowwidget2',
	// 					widget:
	// 					{
	// 						xtype: 'grid',
	// 						itemId: 'level2',
	// 						features: [{
	// 							ftype: 'summary',
	// 							dock: 'bottom'
	// 						}],
	// 						viewConfig: {
	// 							stripeRows: false
	// 						},
	// 						bind: {
	// 							store: '{record.stockin_packinglist}'
	// 						},
	// 						columns: [
	// 							{
	// 								text: 'Cây số', 
	// 								dataIndex: 'packageid',
	// 								width: 50,
	// 							},
	// 							{
	// 								text: 'Khổ (cm)', 
	// 								dataIndex: 'width_met',
	// 								flex: 1,
	// 								align:'right',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value * 100, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isCmColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Khổ thực tế (cm)', 
	// 								dataIndex: 'width_met_check',
	// 								flex: 1,
	// 								align:'right',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value * 100, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isCmColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Khổ (inch)', 
	// 								dataIndex: 'width_yds',
	// 								flex: 1,
	// 								align:'right',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value * 36, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isInchColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Khổ thực tế (inch)', 
	// 								dataIndex: 'width_yds_check',
	// 								flex: 1,
	// 								align:'right',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value * 36, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isInchColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Dài phiếu (m)', 
	// 								dataIndex: 'met_origin',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isMetColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Dài kiểm (m)', 
	// 								dataIndex: 'met_check',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isMetColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Dài phiếu (y)', 
	// 								dataIndex: 'ydsorigin',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isYdsColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Dài kiểm (y)', 
	// 								dataIndex: 'ydscheck',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isYdsColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Cân phiếu', 
	// 								dataIndex: 'grossweight',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isKgColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Cân kiểm', 
	// 								dataIndex: 'grossweight_check',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isKgColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Lbs phiếu', 
	// 								dataIndex: 'grossweight_lbs',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isLbsColumnHidden}',
	// 								},
	// 							},
	// 							{
	// 								text: 'Lbs kiểm', 
	// 								dataIndex: 'grossweight_lbs_check',
	// 								flex: 1,
	// 								align:'right',
	// 								summaryType: 'sum',
	// 								summaryRenderer: 'renderSum',
	// 								renderer: function (value, metaData, record) {
	// 									// if(value ==0) return "";
	// 									metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									return Ext.util.Format.number(value, '0,000.00');
	// 								},
	// 								bind: {
	// 									hidden: '{isLbsColumnHidden}',
	// 								},
	// 							},
	// 							// {
	// 							// 	text: 'Ghi chú', 
	// 							// 	dataIndex: 'comment',
	// 							// 	flex: 2,
	// 							// 	editor:{
	// 							// 		xtype:'textfield',
	// 							// 		selectOnFocus: true
	// 							// 	}
	// 							// },
	// 							{
	// 								text: 'Dãy, tầng, khoang', 
	// 								dataIndex: 'spaceepc_link',
	// 								flex: 2,
	// 								renderer: function (value, metaData, record) {
	// 									// metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
	// 									// return Ext.util.Format.number(value, '0,000.00');
	// 									var result = '';
	// 									if(value == null || value == ''){
	// 										result = 'Thiếu thông tin khoang chứa';
	// 										metaData.tdCls =  'cellYellow';
	// 										return result;
	// 									}
	// 									result = record.get('row') + '-' + record.get('space') + '-' + record.get('floor');
	// 									return result;
	// 								},
	// 							},
	// 						],
	// 					}
	// 				}
	// 			],
	// 			viewConfig: {
	// 				listeners: {
	// 					expandbody: 'onexpandbodySub',
	// 					collapsebody: 'oncollapsebodySub',
	// 				}
	// 			}
	// 		}
	// 	}
    // ],
	// viewConfig: {
	// 	listeners: {
	// 		expandbody: 'onexpandbody',
	// 		collapsebody: 'oncollapsebody',
	// 	}
	// },
});

