Ext.define('GSmartApp.store.UserStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userstatusstore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'name',  type: 'string'}
	],
	data:[{
		id:-1,
		name:GSmartApp.Locales.trangthai_tatca[GSmartApp.Locales.currentLocale],
	},{
		id:0,
		name:GSmartApp.Locales.trangthai_dunghoatdong[GSmartApp.Locales.currentLocale],
	},{
		id:1,
		name:GSmartApp.Locales.trangthai_hoatdong[GSmartApp.Locales.currentLocale],
	}]
});
