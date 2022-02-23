Ext.define('GSmartApp.store.stockin.StockinStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockinstatusstore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	data:[{
		id:-1,
		name:'Tất cả'
	},{
		id:0,
		name:'Chưa nhập kho'
	},{
		id:1,
		name:'Đã nhập kho'
	}]
});
