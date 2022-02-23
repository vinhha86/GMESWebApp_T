Ext.define('GSmartApp.store.Position.PositionStore', {
	extend: 'Ext.data.Store',
	storeId: 'PositionStore',
    alias: 'store.PositionStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'name',  type: 'string'}
	],
	loadStore: function(){
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/position/getall',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
    }
});