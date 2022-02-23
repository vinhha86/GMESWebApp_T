Ext.define('GSmartApp.store.invcheck.InvCheckStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.InvCheckStatusStore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	data:[{
		id:-1,
		name:'Tất cả'
	},{
		id:0,
		name:'Đang kiểm kê'
	},{
		id:1,
		name:'Kết thúc kiểm kê'
	}]
});
