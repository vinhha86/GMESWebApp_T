Ext.define('GSmartApp.store.gender.GenderStore', {
    extend: 'Ext.data.Store',
	alias: 'store.GenderStore',
	storeId: 'GenderStore',
	fields: [
		{name: 'id'},
		{name: 'name', type: 'string'}
	],
	data: [{
        name: 'Nam', id : 1
    },{
        name: 'Nữ', id : 0
    }]
});
