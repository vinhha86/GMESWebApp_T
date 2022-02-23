Ext.define('GSmartApp.store.stockin.StockinLotStore', {
    extend: 'Ext.data.Store',
	alias: 'store.StockinLotStore',
	model: 'GSmartApp.model.stockin.StockinLot',

	loadStore_byStockinId: function(stockinid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockinid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_lot/getByStockinId',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinId_async: function(stockinid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockinid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_lot/getByStockinId',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
	},
	loadStore_byStockinDId: function(stockindid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockindid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_lot/getByStockinDId',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			timeout: 60000,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				this.fireEvent('loadStore_byStockinDId_Done');
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinDId_async: function(stockindid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockindid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_lot/getByStockinDId',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			timeout: 60000,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
	},
	loadStore_getLotNumber_ByStockout_order_d: function(stockoutorderdid_link){
		var me=this;
		var params = new Object();
		params.stockoutorderdid_link = stockoutorderdid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/warehouse/getLotNumber_ByStockout_order_d',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			timeout: 60000,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				this.fireEvent('loadByStockout_order_d_Done');
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
});
