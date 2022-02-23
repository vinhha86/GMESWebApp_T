Ext.define('GSmartApp.store.warehouse.WarehouseStore', {
	extend: 'Ext.data.Store',
	alias: 'store.WarehouseStore',
	storeId: 'WarehouseStore',
	model: 'GSmartApp.model.warehouse.WarehouseModel',
	groupField: 'stockName',
	sorters: {
		direction: 'ASC',
		property: 'material_product_code'
	},
	loadbyorg: function (material_skuid_link, org_from_id_link, porderid_link, pcontractid_link, type, stockout_orderid_link, callback) {
		var params = new Object();
		params.material_skuid_link = material_skuid_link;
		params.org_from_id_link = org_from_id_link;
		params.porderid_link = porderid_link;
		params.typeFilter = type;
		params.stockout_orderid_link = stockout_orderid_link;
		params.pcontractid_link = pcontractid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getby_org',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				callback.call(records, operation, success);
			}
		});
	},
	loadby_cutplan: function (cutplanrowid_link, callback) {
		var me = this;
		var params = new Object();
		params.cutplanrowid_link = cutplanrowid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getby_cutplan',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				callback.call(records, operation, success);
			}
		});
	},
	loadby_pcontract: function (pcontractid_link, stockid_link, skuid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.stockid_link = stockid_link;
		params.skuid_link = skuid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getMaterialListByPContract',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadBySpaceEpc: function (spaceepc_link, stockid_link) {
		var me = this;
		var params = new Object();
		params.spaceepc = spaceepc_link;
		params.stockid_link = stockid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getMaterialListBySpaceEPC_search',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadBySpaceEpc_stock_buyercode: function (spaceepc_link, buyercode, stockid_link) {
		var me = this;
		var params = new Object();
		params.spaceepc = spaceepc_link;
		params.stockid_link = stockid_link;
		params.buyercode = buyercode;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getMaterialListBySpaceEPC_stock_buyercode_search',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadProductBySpaceEpc: function (spaceepc_link, stockid_link) {
		var me = this;
		var params = new Object();
		params.spaceepc = spaceepc_link;
		params.stockid_link = stockid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getProductListBySpaceEPC_search',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},

	loadBySkuAndStock: function (skuid_link) {
		var me = this;
		var params = new Object();
		params.skuid_link = skuid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getBySkuAndStock',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadBySku_pordergrant_stockoutorder: function (stockoutorderid_link, skuid_link, pordergrantid_link, listSelectedEpc) {
		var me = this;
		var params = new Object();
		params.stockoutorderid_link = stockoutorderid_link;
		params.skuid_link = skuid_link;
		params.pordergrantid_link = pordergrantid_link;
		params.listSelectedEpc = listSelectedEpc;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getBySku_pordergrant_stockoutorder',
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
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadBySku_pordergrant_stockoutorder_async: function (stockoutorderid_link, skuid_link, pordergrantid_link) {
		var me = this;
		var params = new Object();
		params.stockoutorderid_link = stockoutorderid_link;
		params.skuid_link = skuid_link;
		params.pordergrantid_link = pordergrantid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin() + '/api/v1/warehouse/getBySku_pordergrant_stockoutorder',
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
	},
});
