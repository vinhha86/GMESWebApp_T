Ext.define('GSmartApp.store.user.StatusUserStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StatusUserStore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	data: [{
        id: 0, name: 'Không sử dụng'
    }, {
        id: 1, name: 'Sử dụng'
    }]
});
