Ext.define('GSmartApp.store.stockin.StockinPklStore', {
    extend: 'Ext.data.Store',
	alias: 'store.StockinPklStore',
	model: 'GSmartApp.model.stockin.Stockin_pklist',

	// data:[
    //     { 
	// 		'name': 'level1-1',  
	// 		"childArr":[
	// 			{
	// 				'name': 'level2-1',
	// 				'childArr2' : [
	// 					{
	// 						'name': 'level3-1',
	// 					},
	// 					{
	// 						'name': 'level3-2',
	// 					}
	// 				]
	// 			},
	// 			{
	// 				'name': 'level2-2',
	// 				'childArr2' : [
	// 					{
	// 						'name': 'level3-3',
	// 					},
	// 					{
	// 						'name': 'level3-4',
	// 					}
	// 				]
	// 			},
	// 		]
	// 	},
    //     { 
	// 		'name': 'level1-2',  
	// 		"childArr":[
	// 			{
	// 				'name': 'level2-3',
	// 				'childArr2' : [
	// 					{
	// 						'name': 'level3-5',
	// 					},
	// 					{
	// 						'name': 'level3-6',
	// 					}
	// 				]
	// 			},
	// 			{
	// 				'name': 'level2-4',
	// 				'childArr2' : [
	// 					{
	// 						'name': 'level3-7',
	// 					},
	// 					{
	// 						'name': 'level3-8',
	// 					}
	// 				]
	// 			},
	// 		]
	// 	},
    // ],

	loadStore_byStockinDIdAndGreaterThanStatus: function(stockindid_link, lotnumber, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
		params.lotnumber = lotnumber;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndGreaterThanStatus',
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
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinDIdAndGreaterThanStatus_async: function(stockindid_link, lotnumber, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
		params.lotnumber = lotnumber;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndGreaterThanStatus',
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

    loadStore_byStockinDIdAndEqualStatus: function(stockindid_link, lotnumber, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
		params.lotnumber = lotnumber;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndEqualStatus',
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
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	loadStore_byStockinDIdAndEqualStatus_async: function(stockindid_link, lotnumber, status){
		var me=this;
		var params = new Object();
		params.stockindid_link = stockindid_link;
		params.lotnumber = lotnumber;
        params.status = status;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getByStockinDIdAndEqualStatus',
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
	loadStore_byStockinID_StockinDID: function(stockinid_link, stockindid_link){
		var me=this;
		var params = new Object();
		params.stockinid_link = stockinid_link;
		params.stockindid_link = stockindid_link;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin_pklist/getbyStockinID_StockinDID',
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
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
   
});
