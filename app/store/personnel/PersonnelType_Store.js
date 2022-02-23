Ext.define('GSmartApp.store.personnel.PersonnelType_Store', {
	extend: 'Ext.data.Store',
	storeId: 'PersonnelType_Store',
    alias: 'store.PersonnelType_Store',
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
			url: config.getAppBaseUrl() + '/api/v1/personnel/gettype',
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
