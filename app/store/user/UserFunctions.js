Ext.define('GSmartApp.store.UserFunctions', {
    extend: 'Ext.data.Store',
    storeId: 'store_userfunctions',
    alias: 'store.userfunctions',

    model: 'GSmartApp.model.UserFunctions',
    autoLoad: false,
    loadFunctions:function(me,callback){
        //var access_token = App.Ajax.access_token();
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
			url: config.getAppBaseUrl()+'/api/v1/appusers/getfunctions',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
            useDefaultXhrHeader: false,
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

		this.on({
			load:function(tree, records, successful, operation, node, eOpts){
				if(!successful){
                    //console.log('menu functions failed!')
					App.util.State.set('session',null);
					this.getController().redirectTo('login');
				}
				if(callback!=null){
					callback.call(this, records, operation, successful);
				}
				//me.setLoading(false);
			}
		});
    }   
});
