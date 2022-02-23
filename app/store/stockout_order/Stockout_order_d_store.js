Ext.define('GSmartApp.store.stockout_order.Stockout_order_d_store', {
    extend: 'Ext.data.Store',
    storeId: 'Stockout_order_d_store',
    alias: 'store.Stockout_order_d_store',

    model: 'GSmartApp.model.stockout.Stockout_order_d',
    GetByStockoutOrder: function(id){
        var params = new Object();
        params.id = id;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/stockoutorder/getdetail_byorder',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
    },
	loadStore_byStockout_orderId: function(stockoutorderid_link){
		var me=this;
		var params = new Object();
		params.stockoutorderid_link = stockoutorderid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockoutorder_d/getByStockoutOrderId',
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
	loadStore_byStockout_orderId_async: function(stockoutorderid_link){
		var me=this;
		var params = new Object();
		params.stockoutorderid_link = stockoutorderid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockoutorder_d/getByStockoutOrderId',
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
	}

});
