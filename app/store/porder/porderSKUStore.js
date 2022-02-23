Ext.define('GSmartApp.store.porder.porderSKUStore', {
	extend: 'Ext.data.Store',
	alias: 'store.porderSKUStore',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'orgrootid_link', type: 'int' },
		{ name: 'porderid_link', type: 'int' },
		{ name: 'productid_link', type: 'int' },
		{ name: 'skuid_link', type: 'int' },
		{ name: 'pquantity_sample', type: 'int' },
		{ name: 'pquantity_porder', type: 'int' },
		{ name: 'pquantity_total', type: 'int' },
		{
			name: 'pquantity_ungranted', type: 'int',
			calculate: function (data) {
				return data.pquantity_total - data.pquantity_granted;
			}
		},
		{ name: 'pquantity_granted', type: 'int' },
		{ name: 'skuName', type: 'string' },
		{ name: 'skuCode', type: 'string' },
		{ name: 'mauSanPham', type: 'string' },
		{ name: 'coSanPham', type: 'string' },
		{ name: 'ordercode', type: 'string' },
		'sort_size'
	],
	groupField: 'ordercode',
	sorters: [{
		direction: 'ASC',
		property: 'mauSanPham'
	}, {
		direction: 'ASC',
		property: 'sort_size'
	}],
	loadStore: function (productid_link) {
		var me = this;
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
			url: config.getAppBaseUrl() + '/api/v1/porder/get_byproduct',
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
	loadByPorderID: function (porderid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/porder/get_product_sku',
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
	loadByPorder_And_PO: function (porderid_link, pcontract_poid_link) {
		var params = new Object();
		params.porderid_link = porderid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porder/getsku_by_porder_po',
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
	loadByPorder_And_PO_async: function (porderid_link, pcontract_poid_link) {
		var params = new Object();
		params.porderid_link = porderid_link;
		params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porder/getsku_by_porder_po',
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
	loadByPorderID_ASync: function (porderid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/porder/get_product_sku',
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
	loadByPorderIDandNotGrantId: function (porderid, grantid) {
		var params = new Object();
		params.porderid = porderid;
		params.grantid = grantid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getproductskubyporder',
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
	loadByPorderID: function (porderid, grantid) {
		var params = new Object();
		params.porderid = porderid;
		params.grantid = grantid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderlist/getallproductskubyporder',
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
	loadByPContractPOforPOrderDetail: function (pcontract_poid_link, porderid_link) {
		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontractsku/getSkuByPcontractPoForPorderDetail',
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
