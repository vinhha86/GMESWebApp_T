Ext.define('GSmartApp.store.PayerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PayerStore',
	fields: [
		{name: 'id'},
		{name: 'name', type:'string'}
	],
	data:[
		{id:1,	name:'Vendor'},
		{id:2,	name:'EndBuyer'}
	]
});
