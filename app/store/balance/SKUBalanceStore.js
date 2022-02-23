Ext.define('GSmartApp.store.SKUBalanceStore', {
	extend: 'Ext.data.Store',
	storeId: 'SKUBalanceStore',
	alias: 'store.SKUBalanceStore',
	idProperty: 'idx',
	fields: [
		'idx',
		{ name: 'mat_skuid_link', type: 'int' },
		{ name: 'mat_sku_code', type: 'string' },
		{ name: 'mat_sku_name', type: 'string' },
		{ name: 'mat_sku_color_id', type: 'int' },
		{ name: 'mat_sku_color_name', type: 'string' },
		{ name: 'mat_sku_size_name', type: 'string' },
		{ name: 'mat_sku_unit_name', type: 'string' },
		{ name: 'mat_sku_product_typename', type: 'string' },
		{ name: 'mat_sku_bom_amount', type: 'number' },
		{ name: 'mat_sku_bom_lostratio', type: 'number' },
		{ name: 'mat_sku_demand', type: 'number' },
		{ name: 'mat_sku_invoice', type: 'number' },
		{ name: 'mat_sku_invoice_date', type: 'date' },
		{ name: 'mat_sku_stockin', type: 'number' },
		{ name: 'mat_sku_stockout', type: 'number' },
		{ name: 'mat_sku_dif', type: 'number' },
		{
			name: 'in_stock',
			calculate: function (data) {
				return (data.mat_sku_stockin - data.mat_sku_stockout);
			}
		},
		{
			name: 'ability',
			calculate: function (data) {
				return (data.mat_sku_stockin - data.mat_sku_stockout) / data.mat_sku_bom_amount;
			}
		},
	],
	groupField: 'mat_sku_product_typename',
	sorters: [{
		property: 'mat_sku_code',
		direction: 'ASC'
	}],
	loadBalanceByPo: function (pcontractid_link, pcontract_poid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/balance/cal_balance_bypo',
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
		// this.load();
		this.load({
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},
	loadBalancePOrder: function (porderid_link) {
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
			url: config.getAppBaseUrl() + '/api/v1/balance/cal_balance_byporder',
			paramsAsJson: true,
			extraParams: params,
			timeout: 120000,
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
		// this.load();
		this.load();
	},
	loadBalancePOrderGrant: function (pordergrantid_link) {
		var params = new Object();
		params.pordergrantid_link = pordergrantid_link;
		params.balance_limit = 1;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/balance/cal_balance_bypordergrant',
			paramsAsJson: true,
			extraParams: params,
			timeout: 120000,
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
		// this.load();
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
				this.fireEvent('loadStore_SKUBalanceStore_Done');
			}
		});
	}
});
