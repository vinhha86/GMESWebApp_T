Ext.define('GSmartApp.store.product.ProductStore', {
	extend: 'Ext.data.Store',
	alias: 'store.ProductStore',
	storeId: 'ProductStore',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'code', type: 'string' },
		{ name: 'name', type: 'string' },
		{ name: 'designerid_link', type: 'int' },
		{ name: 'product_type', type: 'int' },
		{ name: 'product_typeName', type: 'string' },
		{ name: 'designerName', type: 'string' },
		{ name: 'samplemakername', type: 'string' },
		{ name: 'imgurl1', type: 'string' },
		{ name: 'imgurl2', type: 'string' },
		{ name: 'imgurl3', type: 'string' },
		{ name: 'imgurl4', type: 'string' },
		{ name: 'imgurl5', type: 'string' },
		{ name: 'tenMauNPL', type: 'string' },
		{ name: 'thanhPhanVai', type: 'string' },
		{ name: 'coKho', type: 'string' },
		{ name: 'urlimage' },
		'vendorname',
		'buyercode',
		'vendorcode	',
		'buyername'
	],
	groupField: 'product_typeName',
	sorters: [{
		direction: 'ASC',
		property: 'product_type'
	}, {
		direction: 'DESC',
		property: 'id'
	}],
	pageSize: 1,
	loadFilter: function (
		product_type,
		code,
		partnercode,
		attributes,
		productid_link,
		orgcustomerid_link
	) {
		var me = this;
		var params = new Object();
		params.product_type = product_type;
		params.code = code;
		params.partnercode = partnercode;
		params.attributes = attributes;
		params.productid_link = productid_link;
		params.orgcustomerid_link = orgcustomerid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/filter',
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
	loadbyPO: function (pcontract_poid_link) {
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getby_po',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
				else {
					this.fireEvent('done', records[0]);
				}
			}
		});
	},
	loadProductSingle: function (code, is_pair) {
		var params = new Object();
		params.buyercode = code;
		params.is_pair = is_pair;

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
	loadStore_pair_andnotpair: function (pcontractid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/pcontractproduct/getpair_and_single',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore: function (type) {
		var me = this;
		var params = new Object();
		params.product_type = type;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_bypairid: function (id) {
		var me = this;
		var params = new Object();
		params.product_pairid_link = id;
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
	loadStore_bypairid_Async: function (id, pcontractid_link) {
		var me = this;
		var params = new Object();
		params.product_pairid_link = id;
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
	loadStore_ByPage: function (type, limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.product_type = type;
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
				else {
					GSmartApp.util.State.clear('product');
				}
			}
		});
	},
	loadMainMaterial_ByPage: function (limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_mainmaterials',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadSewingTrim_ByPage: function (limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_sewingtrim',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadSewingThread_ByPage: function (limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_sewingthread',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadPackingTrim_ByPage: function (limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_packingtrim',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadProduct_ByPage: function (limit, page, name, code) {
		var me = this;
		var params = new Object();
		params.code = code;
		params.name = name;
		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getall_products',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'pagedata',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_NPL_NotinBom: function (type, name, code, tenmaunpl, productid_link, m) {
		var me = this;
		var params = new Object();
		params.product_type = type;
		params.code = code;
		params.name = name;
		params.tenmaunpl = tenmaunpl;
		params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/getmaterial_notinbom',
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
				m.setLoading(false);
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_NPL_NotinPContractProductBom: function (type, name, code, tenmaunpl,
		productid_link, pcontractid_link, m) {
		var me = this;
		var params = new Object();
		params.product_type = type;
		params.code = code;
		params.name = name;
		params.tenmaunpl = tenmaunpl;
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
			url: config.getAppBaseUrl() + '/api/v1/product/getmaterial_notinpcontractproductbom',
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
				m.setLoading(false);
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_forStockinProductSearch: function (productSearchString) {
		var me = this;
		var params = new Object();
		params.productSearchString = productSearchString;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/product/get_forStockinProductSearch',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				this.fireEvent('ProductStore_load_Done');
				if (!success) {
					
				}
			}
		});
	},
});
