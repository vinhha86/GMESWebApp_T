Ext.define('GSmartApp.store.Stockout_pklist_select', {
    extend: 'Ext.data.Store',
    storeId: 'store_stockout_pklist_select',
    alias: 'store.stockout_pklist_select',

    model: 'GSmartApp.model.Stockout_pklist',
    autoLoad: false,
    loadByStockoutDId:function(stockoutdid){
        var access_token = App.Ajax.access_token();
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
			url: App.Utils.url+'/api/v1/stockoutpklist/getbystockoutdid',
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
        property: 'stockincode',
        direction: 'ASC'
    }]

});
