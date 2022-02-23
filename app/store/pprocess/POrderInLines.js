Ext.define('App.store.POrderInLines', {
    extend: 'Ext.data.Store',
    storeId: 'store_inlines',
    alias: 'store.porderinlines',

    model: 'App.model.POrderProcessing',
    autoLoad: false,
    loadByDate:function(processingdate){
        var param=new Object();
        param.processingdate_to = new Date(processingdate);
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbydate_inlines',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
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
        property: 'granttoorgid_link',
        direction: 'ASC'
    }]
});
