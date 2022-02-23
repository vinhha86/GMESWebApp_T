Ext.define('GSmartApp.store.TagEncodeListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.tagencodeliststore',
	fields: [
		{name: 'epc', type: 'string'},
		{name: 'oldepc',   type: 'string'},
		{name: 'skucode',  type: 'string'},
		{name: 'skuname',   type: 'string'},
		{name: 'tid',   type: 'string'},
		{name: 'desc',   type: 'string'}
	],
});
