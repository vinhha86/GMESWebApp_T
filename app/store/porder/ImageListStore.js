Ext.define('GSmartApp.store.ImageListStore', {
	extend: 'Ext.data.Store',
	storeId: 'store_imageliststore',
    alias: 'store.imageliststore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'imageurl',  type: 'string'}
	],
	
});
