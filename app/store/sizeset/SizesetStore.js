Ext.define('GSmartApp.store.sizeset.SizesetStore', {
	extend: 'Ext.data.Store',
	alias: 'store.SizesetStore',
	storeId: 'SizesetStore',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'name', type: 'string' },
		{ name: 'comment', type: 'string' },
		{ name: 'sortvalue', type: 'int' },

	],
	// sorters: [{
	// property: "sortvalue", direction: "ASC"
	// }],
	loadStore: function () {
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/sizeset/getall',
			paramsAsJson: true,
			extraParams: params,
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
	},
	loadbyProduct: function (productid_link) {
		var params = new Object();
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/sizeset/getbyproduct',
			paramsAsJson: true,
			extraParams: params,
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
});
