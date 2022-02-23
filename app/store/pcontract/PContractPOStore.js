Ext.define('GSmartApp.store.pcontract.PContractPOStore', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractPOStore',
	storeId: 'PContractPOStore',
	model: 'GSmartApp.model.pcontract.PContractPO',
	sorters: [
		{
			direction: 'ASC',
			property: 'shipdate'
		},
		{
			direction: 'ASC',
			property: 'po_buyer'
		},
		{
			direction: 'ASC',
			property: 'productbuyercode'
		}
	],
	getby_shipping: function (productid_link, colorid_link, sizesetid_link) {
		var params = new Object();
		params.productid_link = productid_link;
		params.colorid_link = colorid_link;
		params.sizesetid_link = sizesetid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getby_shipping',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 60000,
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
	getall_by_pobuyer: function (po_buyer) {
		var me = this;
		var params = new Object();
		params.po_buyer = po_buyer;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getall_bycode',
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
	getall_by_pobuyer_async: function (po_buyer) {
		var me = this;
		var params = new Object();
		params.po_buyer = po_buyer;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getall_bycode',
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
	loadPOConfirm: function (pcontractid_link, productid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getby_product_and_type',
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
					me.fireEvent('loaddone');
				}
			}
		});
	},
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getbycontractproduct',
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
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		console.log(records);
		// 	}
		// });		
	},
	getOffers_byOrg() {
		var params = new Object();

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porder_req/getpoline_product_by_org',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 240000,
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
	loadStoreByType: function (pcontractid_link, productid_link, potype) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		params.potype = potype;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getbycontractproduct',
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
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		console.log(records);
		// 	}
		// });		
	},
	loadByPContractAndType: function (pcontractid_link, potype) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.potype = potype;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getbycontract_type',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 60000,
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
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		console.log(records);
		// 	}
		// });		
	},

	loadByPContractAndType_async: function (pcontractid_link, potype) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.potype = potype;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getbycontract_type',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 60000,
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

	loadLeafOnly_ByContract: function (pcontractid_link, productid_link, pcontractpo_id_link) {
		var me = this;
		pcontractpo_id_link = pcontractpo_id_link == null ? 0 : pcontractpo_id_link;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		params.pcontractpo_id_link = pcontractpo_id_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getleafonly_bycontract',
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
	loadAccept_ByContract: function (pcontractid_link, productid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getpo_offer_accept',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 1000 * 60 * 2,
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
	loadAccept_ByContract_Async: function (pcontractid_link, productid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getpo_offer_accept',
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
		this.load();
	},
	loadStoreByContract: function (pcontractid_link) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.productid_link = 0;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getbycontract',
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
	loadStoreBySearch: function (pcontractid_link, buyercode, po_buyer) {
		var me = this;
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.buyercode = buyercode;
		params.po_buyer = po_buyer;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getByContractAndProductBuyerCodeAndPOBuyer',
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
	getpo_havetoship: function (shipdate_from, shipdate_to, orgbuyerid_link) {
		var params = new Object();
		params.shipdate_from = shipdate_from;
		params.shipdate_to = shipdate_to;
		params.orgbuyerid_link = orgbuyerid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/pcontract_po/getpo_havetoship',
			paramsAsJson: true,
			noCache: false,
			extraParams: params,
			timeout: 60000,
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
});
