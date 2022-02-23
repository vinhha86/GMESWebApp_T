Ext.define('GSmartApp.store.TagReadsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.tagreadsstore',
	fields: [
		{name: 'epc', type: 'string'},
		{name: 'sku',  type: 'string'},
		{name: 'tid',   type: 'string'},
		{name: 'port',   type: 'string'},
		{name: 'rssi',   type: 'string'}
	],
});
