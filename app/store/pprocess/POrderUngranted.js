Ext.define('GSmartApp.store.POrderUngranted', {
    extend: 'Ext.data.Store',

    alias: 'store.porderungranted',

    model: 'GSmartApp.model.POrder',
    autoLoad: false,
    //groupField: 'granttoorgname',
    loadAllLatest:function(){
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
			url: config.getAppBaseUrl()+'/api/v1/porder/ungranted',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
            useDefaultXhrHeader: false,
			//extraParams: params,
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
        property: 'collection',
        direction: 'DESC'
    }]
});
