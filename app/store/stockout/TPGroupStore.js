Ext.define('GSmartApp.store.stockout.TPGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TPGroupStore',
	fields: [
		'id', 'name', 'value'
	],
    data: [{
        id: 1, name: 'Loại 1', value: 11
    },{
        id: 2, name: 'Loại 2', value: 12
    },{
        id: 3, name: 'Loại 3', value: 13
    }]
});
