Ext.define('GSmartApp.store.POrder_Plan_Material', {
    extend: 'Ext.data.Store',
    storeId: 'store_POrder_Plan_Material',
    alias: 'store.POrder_Plan_Material',

    model: 'GSmartApp.model.POrder_Plan_Material',
    autoLoad: false,
    load:function(porderid_link){
        var param=new Object();
        param.porderid_link = porderid_link;
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
        property: 'plan_date',
        direction: 'ASC'
    }],

    data:[
		{id:1,	porderid_link: 1, plan_date:'19/05/2020', skuid_link: 1, unitid_link: 1, sku_code: 'SD12716', unit_code:'YDS', unit_code:'YDS', plan_amount: 15000, comment:'Đợt 1', usercreatedid_link:1, timecreate:'01/05/2020'},
		{id:2,	porderid_link: 1, plan_date:'25/05/2020', skuid_link: 1, unitid_link: 1, sku_code: 'SD12716', unit_code:'YDS', unit_code:'YDS', plan_amount: 5000, comment:'Đợt 2', usercreatedid_link:1, timecreate:'01/05/2020'}
	]
});
