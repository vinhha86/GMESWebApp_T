Ext.define('GSmartApp.view.device.DeviceEdit', {
	extend: 'Ext.Panel',
	xtype:'deviceedit',
    controller: 'deviceedit',
	viewModel: {
        type: 'deviceedit'
    },
	layout:'vbox',
	items: [{
		xtype:'formpanel',
	}],
	buttons: [ {
		text: GSmartApp.Locales.btn_luu[GSmartApp.Locales.currentLocale],
		handler: 'onSave'
	},{
        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
        handler: 'onClose'
    }]
});

