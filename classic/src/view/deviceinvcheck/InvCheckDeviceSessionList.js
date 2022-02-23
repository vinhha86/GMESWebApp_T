Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceSessionList', {
	extend: 'Ext.grid.Panel',
	xtype: 'InvCheckDeviceSessionList',
	id: 'InvCheckDeviceSessionList',
	requires: [
		// 'Ext.grid.plugin.CellEditing'
	],
	controller: 'InvCheckDeviceSessionListController',
	columnLines: true,
	rowLines: true,
    border: false,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	bind:{
		store: '{DeviceInvCheckStore}'
	},
	columns: [
		{
			text: 'Số phiên', 
			dataIndex: 'invcheckcode',
			flex: 1
		},{
			text: 'Ngày kiểm', 
            dataIndex: 'invcheckdatetime',
            xtype: 'datecolumn',
            format: 'd/m/Y',
			flex: 1
		},{
			text: 'Kho kiểm kê', 
			dataIndex: 'orgCheckName',
			flex: 1
		},{
			text: 'Người tạo phiên', 
			dataIndex: 'userName',
			flex: 1
		},{
			text: 'Trạng thái', 
			dataIndex: 'status',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                // metaData.tdAttr = 'data-qtip="' + value + '"';
                if(value == 1){
                    metaData.tdCls = 'complete';
                    return "Kiểm kê đủ";
                }else{
                    metaData.tdCls = 'incomplete';
                    return "Kiểm kê thiếu";
                }
            },
		}
	],
});

