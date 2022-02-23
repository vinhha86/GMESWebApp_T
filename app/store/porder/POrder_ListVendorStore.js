Ext.define('GSmartApp.store.porder.POrder_ListVendorStore', {
	extend: 'Ext.data.Store',
	storeId: 'POrder_ListVendorStore',
	alias: 'store.POrder_ListVendorStore',
	fields: [
		{ name: 'vendorname', type: 'string' }
	],
	loadStore: function () {
		var me = this;
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getallvendorname',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
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

});
