Ext.define('GSmartApp.store.DashBoardView.POrderStatusChartStore', {
    extend: 'Ext.data.Store',
    alias: 'store.POrderStatusChartStore',
	storeId: 'POrderStatusChartStore',
	fields: ['status', 'sum'],
    // data: [
    //     { 
    //         status: '0', statusName: "Chưa phân chuyền", sum: 125, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 100
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 25
    //             },
    //         ]
    //     },
    //     { 
    //         status: '1', statusName: "Đã phân chuyền", sum: 215, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 200
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 15
    //             },
    //         ]
    //     },
    //     { 
    //         status: '4', statusName: "Đang sản xuất", sum: 444, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 123
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 321
    //             },
    //         ]
    //     },
    //     { 
    //         status: '6', statusName: "Đã hoàn thành", sum: 50, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 26
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 24
    //             },
    //         ]
    //     },
    //     { 
    //         status: '6', statusName: "Chậm GH (ít)", sum: 20, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 10
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 10
    //             },
    //         ]
    //     },
    //     { 
    //         status: '6', statusName: "Chậm GH (vừa)", sum: 14, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 7
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 7
    //             },
    //         ]
    //     },
    //     { 
    //         status: '6', statusName: "Chậm GH (nhiều)", sum: 10, 
    //         porderBinding_list: [
    //             {
    //                 orgName: 'Bắc Ninh 1',
    //                 sum: 5
    //             },
    //             {
    //                 orgName: 'Bắc Ninh 2',
    //                 sum: 5
    //             },
    //         ]
    //     },
    // ],
    loadStore:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/porder/getPOrderStatusChart',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					//  this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},
    loadStore_async:function(){
		var me=this;
		var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			// url: config.getAppBaseUrl()+'/api/v1/pcontract/getbypaging',
			url: config.getAppBaseUrl()+'/api/v1/porder/getPOrderStatusChart',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
	},

});