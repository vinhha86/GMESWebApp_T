Ext.define('GSmartApp.store.Stockout_pklist', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_pklist',
    alias: 'store.stockout_pklist',

    model: 'GSmartApp.model.Stockout_pklist',
    autoLoad: false,
    loadByStockoutDId:function(stockoutdid){
        var param=new Object();
        param.stockoutdid_link = stockoutdid;
        this.removeAll();

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout/getbystockoutdid',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': 'Bearer ' + access_token
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
            }
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
    },
    loadstore_ByStockoutDId:function(stockoutdid){
        var param=new Object();
        param.id = stockoutdid;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout_pklist/getbystockoutdid',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
            }
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
    },
    loadstore_ByStockoutDId_async:function(stockoutdid){
        var param=new Object();
        param.id = stockoutdid;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout_pklist/getbystockoutdid',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
            }
		});
    },
    loadstore_ByStockoutDId_Rip:function(stockoutdid){
        var param=new Object();
        param.id = stockoutdid;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout_pklist/getbystockoutdid_rip',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
            }
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					this.fireEvent('logout');
				}
			}
		});
    },
    loadstore_ByStockoutDId_Rip_async:function(stockoutdid){
        var param=new Object();
        param.id = stockoutdid;

		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockout_pklist/getbystockoutdid_rip',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
			 },
            useDefaultXhrHeader: false,
			extraParams: param,
			reader: {
				type: 'json',
				rootProperty: 'data'
            }
		});
    },
    // sorters: [{
    //     property: 'stockincode',
    //     direction: 'ASC'
    // }]

});
