Ext.define('GSmartApp.store.Stockout_d_forcheck', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_d_forcheck',
    alias: 'store.stockout_d_forcheck',
    autoLoad: false,
    model: 'GSmartApp.model.Stockout_d',
    groupField: 'pordercode',
    loadByDate:function(stockouttypeid, stockoutdate_from, stockoutdate_to, skucode){
        var access_token = App.Ajax.access_token();
        var param=new Object();
        param.stockoutdate_from = stockoutdate_from;
        param.stockoutdate_to = stockoutdate_to;
        param.skucode = skucode;
        param.stockouttypeid = stockouttypeid;
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
			url: App.Utils.url+'/api/v1/stockout/getstockoutdbydate',
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
            },
            success : function(response,options ) {
                var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },    
    loadByStockoutID:function(stockinid){
        var access_token = App.Ajax.access_token();
        var param=new Object();
        param.stockinid = stockinid;
        console.log(Ext.JSON.encode(param));

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
			url: App.Utils.url+'/api/v1/stockin/getstockin_d',
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
            },
            success : function(response,options ) {
                var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },
    sorters: [{
        property: 'timecreate',
        direction: 'DESC'
    }]

});
