Ext.define('GSmartApp.store.CMPOptionStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CMPOptionStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	data:[
		{id:3,	name:'3 Tháng'},
		{id:6,	name:'6 Tháng'},
		{id:12,	name:'12 Tháng'}
	]
});
