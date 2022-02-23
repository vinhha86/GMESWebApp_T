Ext.define('GSmartApp.store.Sku', {
	extend: 'Ext.data.Store',
	storeId: 'store_sku',
	alias: 'store.sku',

	model: 'GSmartApp.model.Sku',
	autoLoad: false,
	loadByProduct: function (productid_link, isremove) {
		var param = new Object();
		param.productid_link = productid_link;
		param.isremove = false;

		if (isremove)
			param.isremove = isremove;

		this.removeAll();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			pageParam: false, //to remove param "page"
			startParam: false, //to remove param "start"
			limitParam: false, //to remove param "limit"            
			cors: true,
			url: config.getAppBaseUrl() + '/api/v1/sku/getall_byproduct',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
			},
			success: function (response, options) {
				// var response = Ext.decode(response.responseText);
				console.log(response);
			},
			failure: function (response, options) {
				console.log(response);
			}
		});
		this.load();
	},
	load_by_type_and_pcontract(type, pcontractid_link) {
		var params = new Object();
		params.producttypeid_link = type;
		params.pcontractid_link = pcontractid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom/getlist_npl_by_pcontract',
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
	load_by_type_and_pcontract_product(type, pcontractid_link, productid_link, colorid_link) {
		var params = new Object();
		params.producttypeid_link = type;
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		params.colorid_link = colorid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom/getlist_npl_by_pcontract_product_color',
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
	load_by_type_and_pcontract_async(type, pcontractid_link) {
		var params = new Object();
		params.producttypeid_link = type;
		params.pcontractid_link = pcontractid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractproductbom/getlist_npl_by_pcontract',
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
	loadByCode: function (skucode) {
		var param = new Object();
		param.skucode = skucode;
		this.removeAll();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			pageParam: false, //to remove param "page"
			startParam: false, //to remove param "start"
			limitParam: false, //to remove param "limit"            
			cors: true,
			url: config.getAppBaseUrl() + '/api/v1/sku/getsku_mainmaterial',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
			},
			success: function (response, options) {
				// var response = Ext.decode(response.responseText);
				console.log(response);
			},
			failure: function (response, options) {
				console.log(response);
			}
		});
		this.load();
	},
	loadFilter: function (skucode, skutypeid_link) {
		var param = new Object();
		param.skucode = skucode;
		param.skutypeid_link = skutypeid_link;
		this.removeAll();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			pageParam: false, //to remove param "page"
			startParam: false, //to remove param "start"
			limitParam: false, //to remove param "limit"            
			cors: true,
			url: config.getAppBaseUrl() + '/api/v1/sku/getsku_bytype',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
			},
			success: function (response, options) {
				// var response = Ext.decode(response.responseText);
				console.log(response);
			},
			failure: function (response, options) {
				console.log(response);
			}
		});
		this.load();
	}

});
