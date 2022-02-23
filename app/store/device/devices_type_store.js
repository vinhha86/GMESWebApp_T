Ext.define('GSmartApp.store.device.devices_type_store', {
	extend: 'Ext.data.Store',
	alias: 'store.devices_type_store',
	model: 'GSmartApp.model.device.devices_type_model',

	loadStore: function () {

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/devices_type/load_devices_type',
			//extraParams: params,
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	}
})