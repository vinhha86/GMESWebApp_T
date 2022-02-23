Ext.define('GSmartApp.store.UserProfile', {
    extend: 'Ext.data.Store',
    storeId: 'store_userprofile',
    alias: 'store.userprofile',

    model: 'GSmartApp.model.UserProfile',
    autoLoad: false,
    loadProfile:function(){
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
			url: config.getAppBaseUrl()+'/api/v1/appusers/getprofile',
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
        this.reload();
    },        
});
