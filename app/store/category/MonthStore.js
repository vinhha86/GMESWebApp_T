Ext.define('GSmartApp.store.MonthStore', {
    extend: 'Ext.data.Store',
    alias: 'store.monthstore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[
		{id:-1, name:'Xem tất'},
		{id:1,	name:'Tháng 1'},
		{id:2,	name:'Tháng 2'},
		{id:3,	name:'Tháng 3'},
		{id:4,	name:'Tháng 4'},
		{id:5,	name:'Tháng 5'},
		{id:6,	name:'Tháng 6'},
		{id:7,	name:'Tháng 7'},
		{id:8,	name:'Tháng 8'},
		{id:9,	name:'Tháng 9'},
		{id:10,	name:'Tháng 10'},
		{id:11,	name:'Tháng 11'},
		{id:12,	name:'Tháng 12'}
	]
});
