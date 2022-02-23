Ext.define('GSmartApp.store.PProcessStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.pprocessstatus',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[{
		id:-1,
		name:'Xem tất'
	},{
		id:0,
		name:'Chưa phân chuyền'
	},{
		id:1,
		name:'Chờ SX'
	},{
		id:2,
		name:'Chuẩn bị SX'
	},{
		id:3,
		name:'Công đoạn phụ'
	},{
		id:4,
		name:'Đang SX'
	},{
		id:5,
		name:'Kết thúc SX'
	},{
		id:6,
		name:'Đóng gói xong'
	}]
});
