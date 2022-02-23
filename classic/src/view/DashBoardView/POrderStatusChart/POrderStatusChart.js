Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart', {
    extend: 'Ext.form.Panel',
    xtype: 'POrderStatusChart',
    itemId: 'POrderStatusChart',
    controller: 'POrderStatusChartController',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'POrderStatusChart_Grid',
            margin: '1',
            flex: 1,
            bind: {
                hidden: '{isPOrderStatusChart_Grid_Show}'
            }
        },
        {
            xtype: 'POrderStatusChart_Chart',
            margin: '1',
            flex: 1,
            bind: {
                hidden: '{!isPOrderStatusChart_Grid_Show}'
            }
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
				xtype: 'button',
                itemId: 'btnRefresh',
				// text: 'Làm mới',
                tooltip: 'Làm mới',
				iconCls: 'x-fa fa-refresh',
			},
			{
				xtype: 'button',
                itemId: 'btnChangeView',
				// text: 'Đổi góc nhìn',
                tooltip: 'Đổi góc nhìn',
				iconCls: 'x-fa fa-eye',
			}
		]
	}],
});
