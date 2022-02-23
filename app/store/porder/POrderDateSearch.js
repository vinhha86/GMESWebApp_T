Ext.define('GSmartApp.store.POrderDateSearch', {
    extend: 'Ext.data.Store',
    alias: 'store.porderdatesearch',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[{
		id:1,
		name:'1 tháng'
	},{
		id:2,
		name:'2 tháng'
	},{
		id:3,
		name:'3 tháng'
	},{
		id:6,
		name:'6 tháng'
	},{
		id:12,
		name:'1 năm'
	},{
		id:-1,
		name:'Xem tất'
	}]
});
