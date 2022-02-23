Ext.define('GSmartApp.store.OrgTosx', {
    extend: 'Ext.data.Store',
    storeId: 'store_orgtosx',
    alias: 'store.orgtosx',

    model: 'GSmartApp.model.Org',

    // proxy: {
    //     type: 'ajax',
    //     url: config.getAppBaseUrl()+'/api/v1/orgs/tosx',
    //     headers :{
    //         'Accept': "application/json", 
    //         'Content-Type':"application/json",
    //         'authorization': 'Bearer ' + App.Ajax.access_token()
    //      },        
    //     reader: {
    //         type: 'json',
    //         rootProperty: 'items'
    //     }
    // },
    autoLoad: false,
    loadConfig:function(){
		this.setProxy({
            type: 'ajax',
            actionMethods: {
                create : 'GET',
                read   : 'GET',
                update : 'GET',
                destroy: 'GET'
            },
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"            
            cors: true,
			url: config.getAppBaseUrl()+'/api/v1/org/tosx',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
            useDefaultXhrHeader: false,
			reader: {
				type: 'json',
				rootProperty: 'items'
            },
            success : function(response,options ) {
                var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        // this.load();
		// this.on({
		// 	load:function(tree, records, successful, operation, node, eOpts){
		// 		if(callback!=null){
		// 			callback.call(records, operation, successful);
		// 		}
		// 		//me.setLoading(false);
		// 	}
		// });        
    }   
});
