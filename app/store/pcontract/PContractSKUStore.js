Ext.define('GSmartApp.store.pcontract.PContractSKUStore', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractSKUStore',
	storeId: 'PContractSKUStore',
	fields: [
		'idx',
		{ name: 'id', type: 'int' },
		{ name: 'orgrootid_link', type: 'int' },
		{ name: 'pcontractid_link', type: 'int' },
		{ name: 'productid_link', type: 'int' },
		{ name: 'skuid_link', type: 'int' },
		{ name: 'pquantity_sample', type: 'int' },
		{ name: 'pquantity_porder', type: 'int' },
		{ name: 'pquantity_production', type: 'int' },
		{
			name: 'pquantity_total', type: 'int',
			calculate: function (data) {
				return data.pquantity_production + data.pquantity_sample;
			}
		},
		'pquantity',
		{ name: 'pquantity_granted', type: 'int' },
		{ name: 'pquantity_lenhsx', type: 'int' },
		{
			name: 'pquantity_free', type: 'int',
			calculate: function (data) {
				return data.pquantity_total - data.pquantity_lenhsx;
			}
		},
		{ name: 'skuName', type: 'string' },
		{ name: 'skuCode', type: 'string' },
		{ name: 'mauSanPham', type: 'string' },
		{ name: 'coSanPham', type: 'string' },
		'sizeid_link',
		'color_id',
		'sort_value'
	],
	sorters: [{
		direction: 'ASC',
		property: 'mauSanPham'
	}, {
		direction: 'ASC',
		property: 'sort_value'
	}],
	loadStore: function (pcontractid_link, productid_link) {
		var me = this;
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
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getbypcontract_product',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
				else {
					var tabcolor = Ext.getCmp('PContractProduct_Bom_TabColorView').getController();
					tabcolor.createTab();
				}
			}
		});
	},
	loadByPOrderStore: function (porderid_link) {
		var me = this;
		var params = new Object();
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getbyporder',
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
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {

			}
		});
	},
	loadStoreByPO: function (pcontractid_link, pcontract_poid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getbypcontract_po',
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
	},
	loadStoreByPO_ASync: function (pcontractid_link, pcontract_poid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getbypcontract_po',
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
		// this.load();
	},
	loadStoreByPO_and_Product: function (productid_link, pcontract_poid_link, material_skuid_link) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getby_po_product',
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
	},
	loadStoreByPO_and_Product_Material: function (productid_link, pcontract_poid_link, material_skuid_link) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontract_poid_link = pcontract_poid_link;
		params.material_skuid_link = material_skuid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getby_po_product_linesku',
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
				if (success) {
					this.fireEvent('loadStoreByPO_and_Product_done')
				}
			}
		});
	},
	loadPOSKU_Free: function (pcontractid_link, pcontract_poid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getposku_free',
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
	},
	loadPOSKU_Free_ByProduct: function (productid_link, pcontract_poid_link) {
		var me = this;
		var params = new Object();
		params.productid_link = productid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getposku_free_byproduct',
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
	},
	load_by_pcontract_po: function (pcontract_poid_link) {
		var me = this;
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getall_sku_byline',
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
	},
	load_by_pcontract_po_avail: function (pcontract_poid_link, isshow_available) {
		var me = this;
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		params.isshow_available = isshow_available;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getall_sku_byline',
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
	},
	load_by_pcontract_po_async: function (pcontract_poid_link) {
		var me = this;
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getall_sku_byline',
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
