Ext.define('GSmartApp.store.POrderProcessing', {
    extend: 'Ext.data.Store',
    storeId: 'store_processing',
    alias: 'store.porderprocessing',

    model: 'GSmartApp.model.POrderProcessing',
    autoLoad: false,
    // groupField: 'granttoorgname',
    grouper: {
        property: 'granttoorgname',
        sortProperty: 'granttoorgid_link'
    },
    loadAllLatest:function(){
		this.setProxy({
            type: 'ajax',
            method:'POST',
            cors: true,
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getalllatest',
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
                //console.log(response);
            },
            failure :function(response,options){
				console.log(response);
			}
		});
		// this.loadPage(1,{
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		}
		// 	}
		// });        
    },
    loadById: function(id){
        this.removeAll();

        var param=new Object();
        param.processingdate_to = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
        param.orgid = id;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbyid',
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
		});
    },
    loadByDate:function(processingdate, orgid){
        this.removeAll();

        var param=new Object();
        param.processingdate_to = new Date(processingdate);
        param.orgid = orgid;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbydate',
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
    loadByCurrentDate:function(orgid){
        this.removeAll();

        var param=new Object();
        param.processingdate_to = new Date();
        param.orgid = orgid;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbydate',
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
    loadBySalaryMonth:function(processingdate, salaryyear, salarymonth){
        this.removeAll();

        var param=new Object();
        param.processingdate_to = new Date(processingdate);
        param.orgid = '';
        param.salaryyear = salaryyear;
        param.salarymonth = salarymonth;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbysalarymonth',
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
    loadCutting:function(processingdate){
        this.removeAll();

        var param=new Object();
        param.processingdate_to = new Date(processingdate);
        param.orgid = 0;
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
			url: config.getAppBaseUrl()+'/api/v1/cutting/getbydate',
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
    loadByPOrderAndPOrderGrant: function(porderid_link, pordergrantid_link){
        var param=new Object();
        param.porderid_link = porderid_link;
        param.pordergrantid_link = pordergrantid_link;

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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getByPOrderAndPOrderGrant',
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
        });
        this.load();
    },
    sorters: [
        // {
        //     property: 'granttoorgid_link',
        //     direction: 'ASC'
        // },        
        {
            property: 'shortvalue',
            direction: 'ASC'
        },
        {
            property: 'processingdate',
            direction: 'DESC'
        }
    ]
});
