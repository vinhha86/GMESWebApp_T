Ext.define('GSmartApp.store.Stockout_forcheck_report', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockoutforcheckreport',
    alias: 'store.stockoutforcheckreport',

    model: 'GSmartApp.model.Stockoutreport',
 
    loadByDate:function(stockoutdate_from, stockoutdate_to,stockouttypeid){
        var access_token = App.Ajax.access_token();
        var param=new Object();
        param.stockoutdate_from = stockoutdate_from;
        param.stockoutdate_to = stockoutdate_to;
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
			url: App.Utils.url+'/api/v1/stockoutpklist/reportskuprocesed',
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
                // var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },    
    sorters: [{
        property: 'skucode',
        direction: 'ASC'
    }]

});
