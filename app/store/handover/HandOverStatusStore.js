Ext.define('GSmartApp.store.handover.HandOverStatusStore', {
    extend: 'Ext.data.Store',
	alias: 'store.HandOverStatusStore',
	storeId: 'HandOverStatusStore',
	fields: [
		{name: 'id', type: 'int'},
        {name: 'name',   type: 'string'},
    ],
    data: [
        {id: 0, name: 'Chưa duyệt'},
        {id: 1, name: 'Đã duyệt'},
        {id: 2, name: 'Đã nhận'},
    ]
});
