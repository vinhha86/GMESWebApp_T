Ext.define('GSmartApp.store.POrderFilter', {
    extend: 'Ext.data.Store',
    storeId: 'store_porderfilter',
    alias: 'store.POrderFilter',

	model: 'GSmartApp.model.POrder',
    groupField: 'granttoorgname',
	loadOne: function(porderid_link){
		var me=this;
		var params = new Object();
        params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/getone',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},  	
	loadByPO: function(pcontractid_link, pcontract_poid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_bypo',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},   
	loadByPOrder_Req: function(pcontract_poid_link,porderreqid_link){
		var me=this;
		var params = new Object();
        params.porderreqid_link = porderreqid_link;
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_byporder_req',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
		// this.load({
		// 	callback: function(records, operation, success){
		// 	console.log(records);
		// 	}
		// });		
	}, 
	loadByPOrder_Req_Async: function(pcontract_poid_link,porderreqid_link){
		var me=this;
		var params = new Object();
        params.porderreqid_link = porderreqid_link;
        params.pcontract_poid_link = pcontract_poid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_byporder_req',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		// this.load({
		// 	callback: function(records, operation, success){
		// 	console.log(records);
		// 	}
		// });		
	}, 			  
	loadByContract: function(pcontractid_link, productid_link){
		var me=this;
		var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_bycontract',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1);
	}, 
	loadFree_bygolivedate: function(golivedate_from, golivedate_to){
		var me=this;
		var params = new Object();
        params.golivedate_from = golivedate_from;
		params.golivedate_to = golivedate_to;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder/get_free_bygolivedate',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load({
			scope: this,
			callback: function(records, operation, success){
				if(!success){
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Phiên làm việc đã hết thời gian! Bạn hãy đăng nhập lại',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						},
						fn: function () {
							// this.fireEvent('logout');
						}
					});
				}
			}
		});
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
			url: config.getAppBaseUrl()+'/api/v1/porder/getfilter',
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
       
    // sorters: [{
    //     property: 'status',
    //     direction: 'DESC'
    // },
    // {
        
    //     property: 'ordercode',
    //     direction: 'ASC'
    // }
    // ]
});
