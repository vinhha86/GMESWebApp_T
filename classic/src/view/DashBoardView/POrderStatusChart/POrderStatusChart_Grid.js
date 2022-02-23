Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart_Grid', {
	extend: 'Ext.grid.Panel',
	xtype: 'POrderStatusChart_Grid',
	itemId: 'POrderStatusChart_Grid',
    controller: 'POrderStatusChart_GridController',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
	// features: [{
	// 	ftype: 'summary',
	// 	dock: 'bottom'
	// }],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        columnLines: true,
        rowLines: true,
    },
	bind:{
		store: '{POrderStatusChartStore}'
	},
	columns: [
        {
			text: 'Trạng thái lệnh', 
			dataIndex: 'statusName',
			flex: 1,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		},
        {
			text: 'Số lượng', 
			dataIndex: 'sum',
			flex: 1,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	var val = value == 'null' ? "" : value;
			// 	metaData.tdAttr = 'data-qtip="' + val + '"';
			// 	return val;
			// },
		}
	],
    plugins: {
        rowwidget: {
            widget:
            {
                xtype: 'grid',
                viewConfig: {
                    stripeRows: false
                },
                bind: {
                    store: '{record.porderBinding_list}',
                },
                columns: [
                    {
                        text: 'Phân xưởng',
                        dataIndex: 'orgName',
                        flex: 1,
                    },
                    {
                        text: 'Số lượng',
                        dataIndex: 'sum',
                        flex: 1,
                    },
                ]
            }
        }
    },
});

