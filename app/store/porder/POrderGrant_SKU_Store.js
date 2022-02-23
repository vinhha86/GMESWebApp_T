Ext.define('GSmartApp.store.porder.POrderGrant_SKU_Store', {
	extend: 'Ext.data.Store',
	storeId: 'POrderGrant_SKU_Store',
	alias: 'store.POrderGrant_SKU_Store',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'skuCode', type: 'string'},
		{name: 'mauSanPham', type: 'string'},
		{name: 'coSanPham', type: 'string'},
		{name: 'amount',   type: 'int'},
	],
	loadStore_byPorderGrant_grouped: function(porder_grantid_link){
		var params = new Object();
		params.porder_grantid_link = porder_grantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/get_POrderGrant_SKU_byPorderGrant',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
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
			}
		});
	},
	loadStore_byPorderGrant_grouped_async: function(porder_grantid_link){
		var params = new Object();
		params.porder_grantid_link = porder_grantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/get_POrderGrant_SKU_byPorderGrant',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	},
});
