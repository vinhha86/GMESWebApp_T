Ext.define('GSmartApp.store.POrderGranted', {
    extend: 'Ext.data.Store',
    storeId: 'store_waiting',
    alias: 'store.pordergranted',

    model: 'GSmartApp.model.POrderProcessing',
    autoLoad: false,
    groupField: 'granttoorgid_link',
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbydate_granted_erp',
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
                //var response = Ext.decode(response.responseText);
                console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
        this.load();
    },
    loadFilter:function(
        ordercode, 
        orderstatus, 
        granttoorgid_link,
        collection,
        season,
        salaryyear,
        salarymonth,
        processingdate_from,
        processingdate_to){
        this.removeAll();

        var param=new Object();
        param.ordercode = ordercode;
        param.orderstatus = orderstatus;
        param.granttoorgid_link = granttoorgid_link;
        param.collection = collection;
        param.season = season;
        param.salaryyear = salaryyear;
        param.salarymonth = salarymonth;
        param.processingdate_from = processingdate_from;
        param.processingdate_to = processingdate_to;
        //console.log(Ext.JSON.encode(param));

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
			url: config.getAppBaseUrl()+'/api/v1/porders/getfilter',
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
        this.load();
    },      
    sorters: [{
        property: 'productiondate',
        direction: 'ASC'
    }]
});
