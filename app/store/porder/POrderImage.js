Ext.define('GSmartApp.store.POrderImage', {
    extend: 'Ext.data.Store',
    storeId: 'store_porderimage',
    alias: 'store.porderimage',

    model: 'GSmartApp.model.POrderImage',
    autoLoad: false,
    loadImage:function(ordercode){
        this.removeAll();

        var param=new Object();
        param.ordercode = ordercode;

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
			url: config.getAppBaseUrl()+'/api/v1/porders/getimages',
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
        property: 'shortvalue',
        direction: 'ASC'
    },{
        
        property: 'ordercode',
        direction: 'ASC'
    }]
});
