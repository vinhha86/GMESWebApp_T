Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceDetailList', {
	extend: 'Ext.grid.Panel',
	xtype: 'InvCheckDeviceDetailList',
	id: 'InvCheckDeviceDetailList',
	requires: [
		// 'Ext.grid.plugin.CellEditing'
	],
	controller: 'InvCheckDeviceDetailListController',
	columnLines: true,
	rowLines: true,
    border: false,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	bind:{
		store: '{device_store}'
	},
	columns: [
		{
			text: 'Chủng loại tài sản', 
			dataIndex: 'deviceType',
			flex: 1
		},{
			text: 'Model', 
			dataIndex: 'deviceModel',
			width: 110
		},{
			text: 'Số quản lý', 
			dataIndex: 'code',
			width: 120
		},{
			text: 'Số TSCĐ', 
			dataIndex: 'fixassetno',
			width: 110
		},{
			text: 'Mã thiết bị (EPC)', 
			dataIndex: 'epc',
			flex: 1
		}
	],
});

