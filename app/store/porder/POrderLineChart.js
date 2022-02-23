Ext.define('GSmartApp.store.POrderLineChart', {
	extend: 'Ext.data.Store',
	storeId: 'store_POrderLineChart',
	alias: 'store.POrderLineChart',
	model: 'GSmartApp.model.POrderProcessing',
	
    LoadPorderProcessing:function(porderid_link){
        this.removeAll();

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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getbyorderid',
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
		// this.load();
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		}
		// 		else{
		// 			// console.log(this.data.items);
		// 			config = config || {};
		// 			config.data = this.data.items;
		// 			this.callParent([config]);
		// 		}
		// 	}
		// });
    },
	LoadPorderProcessing_byPO:function(pcontract_poid_link){
        this.removeAll();

        var param=new Object();
        param.pcontract_poid_link = pcontract_poid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getby_pcontract_poid_link',
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
	Load_slGiaoHang_byPO:function(pcontract_poid_link){
        this.removeAll();

        var param=new Object();
        param.pcontract_poid_link = pcontract_poid_link;
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/get_slgiaohang_by_pcontract_po',
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

	// data:[
	// 	{ processingdate_str: '01/05', amountinputsum: 200, amountoutputsum: 100},
	// 	{ processingdate_str: '02/05', amountinputsum: 200, amountoutputsum: 150 },
	// 	{ processingdate_str: '03/05', amountinputsum: 190, amountoutputsum: 210},
	// 	{ processingdate_str: '04/05', amountinputsum: 180, amountoutputsum: 220}
	// 	// { day: '05/05', data1: 180, data2: 230, data3: 39, data4: 4, other: 4 },
	// 	// { day: '06/05', data1: 170, data2: 240, data3: 42, data4: 4, other: 3 },
	// 	// { day: '07/05', data1: 160, data2: 250, data3: 43, data4: 4, other: 3 },
	// 	// { day: '08/05', data1: 160, data2: 250, data3: 44, data4: 4, other: 3 },
	// 	// { day: '09/05', data1: 160, data2: 250, data3: 44, data4: 4, other: 4 },
	// 	// { day: '10/05', data1: 160, data2: 250, data3: 45, data4: 4, other: 3 },
	// 	// { day: '11/05', data1: 150, data2: 250, data3: 46, data4: 4, other: 4 },
	// 	// { day: '12/05', data1: 150, data2: 250, data3: 47, data4: 4, other: 3 },
	// 	// { day: '13/05', data1: 200, data2: 250, data3: 35, data4: 4, other: 4 },
	// 	// { day: '14/05', data1: 200, data2: 250, data3: 36, data4: 5, other: 2 },
	// 	// { day: '15/05', data1: 190, data2: 250, data3: 37, data4: 4, other: 4 },
	// 	// { day: '16/05', data1: 180, data2: 250, data3: 38, data4: 5, other: 3 },
	// 	// { day: '17/05', data1: 180, data2: 250, data3: 39, data4: 4, other: 4 },
	// 	// { day: '18/05', data1: 170, data2: 250, data3: 42, data4: 4, other: 3 },
	// 	// { day: '19/05', data1: 160, data2: 250, data3: 43, data4: 4, other: 3 },
	// 	// { day: '20/05', data1: 160, data2: 250, data3: 44, data4: 4, other: 3 },
	// 	// { day: '21/05', data1: 160, data2: 250, data3: 44, data4: 4, other: 4 },
	// 	// { day: '22/05', data1: 160, data2: 250, data3: 45, data4: 4, other: 3 },
	// 	// { day: '23/05', data1: 150, data2: 250, data3: 46, data4: 4, other: 4 },
	// 	// { day: '24/05', data1: 150, data2: 250, data3: 47, data4: 4, other: 3 }
	// ]
});
