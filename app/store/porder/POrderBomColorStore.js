Ext.define('GSmartApp.store.pcontract.POrderBomColorStore', {
	extend: 'Ext.data.Store',
	alias: 'store.POrderBomColorStore',
	storeId: 'POrderBomColorStore',
	model: 'GSmartApp.model.porders.POrderBomColorModel',
	groupField: 'product_typeName',
	sorters: [{
		direction: 'ASC',
		property: 'product_type'
	}, {
		direction: 'ASC',
		property: 'materialName'
	}],
	loadStoreColor: function (porderid_link, colorid_link) {
		var me = this;
		var params = new Object();
		params.porderid_link = porderid_link;
		params.colorid_link = colorid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderbom/getlist_poder_bomcolor',
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
	loadbytype: function (porderid_link, type_from, type_to) {
		var me = this;
		var params = new Object();
		params.porderid_link = porderid_link;
		params.type_from = type_from;
		params.type_to = type_to;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderbom/get_npl_by_type',
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

	getbom_by_porder: function (porderid_link, pcontractid_link, productid_link) {
		var me = this;
		var params = new Object();
		params.porderid_link = porderid_link;
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
			url: config.getAppBaseUrl() + '/api/v1/porderbom/getbom_by_porder',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
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
	getbom_by_porder_mat: function (porderid_link, pcontractid_link, productid_link, material_skuid_link) {
		var me = this;
		var params = new Object();
		params.porderid_link = porderid_link;
		params.pcontractid_link = pcontractid_link;
		params.productid_link = productid_link;
		params.material_skuid_link = material_skuid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/porderbom/getbom_by_porder_material',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
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
	}
});
