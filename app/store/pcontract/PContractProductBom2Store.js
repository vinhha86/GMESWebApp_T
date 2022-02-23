Ext.define('GSmartApp.store.pcontract.PContractProductBom2Store', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractProductBom2Store',
	storeId: 'PContractProductBom2Store',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'productid_link', type: 'int' },
		{ name: 'materialid_link', type: 'int' },
		{ name: 'materialName', type: 'string' },
		'materialCode',
		{ name: 'unitName', type: 'string' },
		{ name: 'amount' },
		{ name: 'lost_ratio', },
		{ name: 'description', type: 'string' },
		{ name: 'createduserid_link', type: 'int' },
		{ name: 'createduserName', type: 'string' },
		{ name: 'createddate', type: 'string' },
		{ name: 'tenMauNPL', type: 'string' },
		{ name: 'coKho', type: 'string' },
		{ name: 'thanhPhanVai', type: 'string' },
		{ name: 'product_typeName', type: 'string' },
		{ name: 'product_type', type: 'int' },
		{ name: 'pcontractid_link', type: 'int' },
		'colorid_link',
		'color_name'
	],
	groupField: 'product_typeName',
	sorters: [{
		direction: 'ASC',
		property: 'product_type'
	}, {
		direction: 'ASC',
		property: 'materialName'
	}],

	loadStore: function (pcontractid_link, productid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom2/getlist_pcontract_productbom',
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
			noCache: false,
			timeout: 120*1000,
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
	loadMaterialByContract: function (pcontractid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/balance/get_material_bycontract',
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
	loadProductListByMaterial: function (pcontractid_link, materialid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.materialid_link = materialid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/balance/get_productlist_bymaterial',
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
		// this.loadPage(1, {
		// 	scope: this,
		// 	callback: function (records, operation, success) {
		// 		if (!success) {
		// 			// this.fireEvent('logout');
		// 		}
		// 	}
		// });
	}
});
