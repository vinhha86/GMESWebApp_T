Ext.define('GSmartApp.store.CutplanProcessingLineChart', {
	extend: 'Ext.data.Store',
	storeId: 'CutplanProcessingLineChart',
	alias: 'store.CutplanProcessingLineChart',
	model: 'GSmartApp.model.CutplanProcessingLineChart',
	
    Load_byPorder:function(porderid_link, skuid_link){
        this.removeAll();

        var param=new Object();
        param.porderid_link = porderid_link;
        param.skuid_link = skuid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/cutplan_processing/cutplan_processing_list_chart',
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
                //console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
    },
});
