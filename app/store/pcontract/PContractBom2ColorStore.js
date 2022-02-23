Ext.define('GSmartApp.store.pcontract.PContractBom2ColorStore', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractBom2ColorStore',
	storeId: 'PContractBom2ColorStore',
	model: 'GSmartApp.model.pcontract.PContractBOMColorModel',
	groupField: 'product_typename',
	sorters: [{
		direction: 'ASC',
		property: 'product_type'
	}, {
		direction: 'ASC',
		property: 'materialName'
	}],
	loadStoreColor: function (pcontractid_link, productid_link, colorid_link) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
		params.colorid_link = colorid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom2/getlist_pcontract_productbomcolor',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
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
	},
	load_bom_by_product: function (pcontractid_link, productid_link) {
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom2/getbom_by_product',
			paramsAsJson: true,
			timeout: 120 * 1000,
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},

	load_bom_by_product_withcallback: function (pcontractid_link, productid_link, callback) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom2/getbom_by_product',
			paramsAsJson: true,
			extraParams: params,
			timeout: 120 * 1000,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				processRawResponse: function (response) {
					if (response.responseJson != null) {
						me.fireEvent('loaddone', response.responseJson.isbomdone);
					}
				}
			}
		});
		this.load();
	},

	load_bom_by_product_multithread: function (pcontractid_link, productid_link) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom2/getbom_by_product_multithread',
			paramsAsJson: true,
			extraParams: params,
			timeout: 120 * 1000,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data',
				processRawResponse: function (response) {
					if (response.responseJson != null) {
						me.fireEvent('loaddone', response.responseJson.isbomdone);
					}
				}
			}
		});
		this.load();
	}
});
