Ext.define('GSmartApp.store.porder.POrderGrant_SKU_PlanStore', {
	extend: 'Ext.data.Store',
	storeId: 'POrderGrant_SKU_PlanStore',
	alias: 'store.POrderGrant_SKU_PlanStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'skuCode', type: 'string'},
		{name: 'mauSanPham', type: 'string'},
		{name: 'coSanPham', type: 'string'},
		{name: 'date',   type: 'date', dateFormat: 'c'},
		{
            name: 'date_string',
            calculate: function(data) {
                return Ext.Date.format(data.date,'d/m');
            }
        },
		{
            name: 'skuCode_string',
            convert: function (value, rec) {
				return rec.get('skuCode') + ' - ' + rec.get('mauSanPham') + ' - ' + rec.get('coSanPham') + ' - ' + rec.get('porderGrant_SKU_grantamount');
			}
        },
		{name: 'porder_grant_skuid_link',   type: 'int'},
		{name: 'amount',   type: 'int'},
	],
	loadStore:function(porder_grant_skuid_link){
		var params = new Object();
		params.porder_grant_skuid_link = pordergrantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getByPOrderGrantSku',
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
	loadStore_byPorderGrant:function(porder_grantid_link, startDate, endDate){
		var params = new Object();
		params.porder_grantid_link = porder_grantid_link;
		params.dateFrom = startDate;
		params.dateTo = endDate;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getByPOrderGrant',
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
				this.fireEvent('loadStore_byPorderGrant_Done');
			}
		});
	},
	loadStore_byPorderGrant_async:function(porder_grantid_link, startDate, endDate){
		var params = new Object();
		params.porder_grantid_link = porder_grantid_link;
		params.dateFrom = startDate;
		params.dateTo = endDate;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getByPOrderGrant',
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
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 // this.fireEvent('logout');
		// 		} else {
		// 			// console.log(records);
		// 		}
		// 		this.fireEvent('loadStore_byPorderGrant_Done');
		// 	}
		// });
	},
	loadStore_KeHoachVaoChuyen:function(pcontractid_link, porderid_link, porder_grantid_link){
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.porderid_link = porderid_link;
		params.porder_grantid_link = porder_grantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getFor_KeHoachVaoChuyen',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
				this.fireEvent('loadStore_byPorderGrant_Done');
			}
		});
	},
	loadStore_KeHoachVaoChuyen_async:function(pcontractid_link, porderid_link, porder_grantid_link){
		var params = new Object();
		params.pcontractid_link = pcontractid_link;
		params.porderid_link = porderid_link;
		params.porder_grantid_link = porder_grantid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_grant_sku_plan/getFor_KeHoachVaoChuyen',
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
