Ext.define('GSmartApp.store.cutplan.CutPlanRowStore', {
	extend: 'Ext.data.Store',
	alias: 'store.CutPlanRowStore',
	model: 'GSmartApp.model.CutPlan.CutPlanRow_Model',
	sorters: [{
		direction: 'DESC',
		property: 'type'
	}, {
		direction: 'ASC',
		property: 'id'
	}],
	loadStore_bycolor: function (colorid_link, porderid_link, material_skuid_link, productid_link, pcontractid_link) {
		var params = new Object();
		params.colorid_link = colorid_link;
		params.porderid_link = porderid_link;
		params.material_skuid_link = material_skuid_link;
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
			url: config.getAppBaseUrl() + '/api/v1/cutplan/getby_color',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1);
	},
	loadStore_byloaiphoi: function (colorid_link, porderid_link, material_skuid_link,
		productid_link, pcontractid_link, loaiphoi) {
		var params = new Object();
		params.colorid_link = colorid_link;
		params.porderid_link = porderid_link;
		params.material_skuid_link = material_skuid_link;
		params.productid_link = productid_link;
		params.pcontractid_link = pcontractid_link;
		params.loaiphoi = loaiphoi;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/cutplan/getby_color',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1);
	},

	loadStore_bycolor_async: function (colorid_link, porderid_link, material_skuid_link, productid_link, pcontractid_link) {
		var params = new Object();
		params.colorid_link = colorid_link;
		params.porderid_link = porderid_link;
		params.material_skuid_link = material_skuid_link;
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
			url: config.getAppBaseUrl() + '/api/v1/cutplan/getby_color',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	},

	loadStore_byPorder: function (porderid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/cutplan_processing/cutplan_row_by_porder',
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1);
	}
});
