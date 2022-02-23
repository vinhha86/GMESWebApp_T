Ext.define('GSmartApp.store.deviceout.DeviceOutStatusStore', {
    extend: 'Ext.data.Store',
	alias: 'store.DeviceOutStatusStore',
	fields: [
		{name: 'id'},
	],
    data: [
        // {id: -1, name:'Đã xoá'},
        {id: 0, name:'Đang hoạt động'},
        {id: 1, name:'Đã xác nhận'}
    ]
});
