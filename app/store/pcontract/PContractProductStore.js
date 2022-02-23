Ext.define('GSmartApp.store.pcontract.PContractProductStore', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractProductStore',
	storeId: 'PContractProductStore',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'orgrootid_link', type: 'int' },
		{ name: 'pcontractid_link', type: 'int' },
		{ name: 'productid_link', type: 'int' },
		{ name: 'productName', type: 'string' },
		{ name: 'productCode', type: 'string' },
		{ name: 'pquantity', type: 'int' },
		{ name: 'production_date', type: 'date', format: 'c' },
		{ name: 'delivery_date', type: 'date', format: 'c' },
		'unitprice',
		{ name: 'imgproduct' },
		'productBuyerCode',
		'productVendorCode',
		'pairamount',
		'productinfo'
	],
	sorters: [{
		direction: 'ASC',
		property: 'productid_link'
	}],
	loadStore_bypairid: function (id, po_quantity, ishidden) {
		var me = this;
		ishidden = ishidden == null ? false : ishidden;

		var params = new Object();
		params.product_pairid_link = id;
		params.ishidden_pair = ishidden;
		params.po_quantity = po_quantity;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/get_by_pairid',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			timeout: 120000,
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
	},
	loadStore_bypairid_Async: function (id, po_quantity, ishidden, pcontractid_link) {
		var me = this;
		console.log(pcontractid_link);
		var params = new Object();
		params.product_pairid_link = id;
		params.ishidden_pair = ishidden;
		params.po_quantity = po_quantity;
		params.pcontractid_link = pcontractid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/get_by_pairid',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			timeout: 120000,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	},
	loadStore: function (pcontractid_link, productid_link) {
		var me = this;
		productid_link = productid_link == null ? 0 : productid_link;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproduct/getbypcontract',
			paramsAsJson: true,
			noCache: false,
			timeout: 120000,
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					//  this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_async: function (pcontractid_link, productid_link) {
		var me = this;
		productid_link = productid_link == null ? 0 : productid_link;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproduct/getbypcontract',
			paramsAsJson: true,
			noCache: false,
			timeout: 120000,
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
	},
	loadStore_ByProductList: function (pcontractid_link, ls_productid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.ls_productid_link = ls_productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproduct/getbypcontract',
			paramsAsJson: true,
			noCache: false,
			timeout: 120000,
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_product: function (buyercode) {
		var me = this;
		var params = new Object();
		params.buyercode = buyercode;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_product_single',
			paramsAsJson: true,
			noCache: false,
			timeout: 120000,
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_product_async: function (buyercode) {
		var me = this;
		var params = new Object();
		params.buyercode = buyercode;
		params.is_pair = false;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_product_single',
			paramsAsJson: true,
			noCache: false,
			timeout: 120000,
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
	}
});
