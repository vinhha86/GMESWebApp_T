Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceEPCList', {
	extend: 'Ext.grid.Panel',
	xtype: 'InvCheckDeviceEPCList',
	id: 'InvCheckDeviceEPCList',
	requires: [
		// 'Ext.grid.plugin.CellEditing'
	],
	controller: 'InvCheckDeviceEPCListController',
	columnLines: true,
	rowLines: true,
    border: false,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	bind:{
		store: '{DeviceInvCheckEPCStore}'
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
			dataIndex: 'deviceCode',
			width: 120
		},{
			text: 'Số TSCĐ', 
			dataIndex: 'deviceFixassetno',
			width: 110
		},{
			text: 'Mã thiết bị (EPC)', 
			dataIndex: 'deviceEPCCode',
			flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                if(record.data.checkstatus == 1){
                    metaData.tdCls = 'complete';
                }else{
                    metaData.tdCls = 'incomplete';
				}
				return value;
            },			
		},
		// {
		// 	text: 'Trạng thái', 
		// 	dataIndex: 'checkstatus',
        //     width: 100,
        //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //         // metaData.tdAttr = 'data-qtip="' + value + '"';
        //         if(value == 1){
        //             metaData.tdCls = 'complete';
        //             return "Đã kiểm kê";
        //         }else{
        //             metaData.tdCls = 'incomplete';
        //             return "Chưa kiểm kê";
        //         }
        //     },
		// }
	],
});

