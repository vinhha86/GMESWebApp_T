Ext.define('GSmartApp.store.POrderBySaleRequest', {
    extend: 'Ext.data.Store',
    storeId: 'store_porderbysalerequest',
    alias: 'store.porderbysalerequest',

    model: 'GSmartApp.model.POrderFilter',
    autoLoad: false,
    // groupField: 'granttoorgid_link',
    loadFilter:function(
        goliveyear,
        golivemonth,
        processingdate_from,
        processingdate_to){
        this.removeAll();

        var param=new Object();
        param.ordercode = '';
        param.orderstatus = '';
        param.granttoorgid_link = '';
        param.collection = '';
        param.season = '';
        param.salaryyear = goliveyear;
        param.salarymonth = golivemonth;
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
			url: config.getAppBaseUrl()+'/api/v1/porders/getfilterbysaleorder',
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
        
        property: 'complete_rate',
        direction: 'DESC'
    }]
});
