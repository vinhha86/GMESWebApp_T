Ext.define('GSmartApp.store.DashBoardView.LineChartPackStockedAmountStore', {
    extend: 'Ext.data.Store',
    alias: 'store.LineChartPackStockedAmountStore',
    storeId: 'LineChartPackStockedAmountStore',
	
	fields: [
		{name: 'processingDate',   type: 'date', dateFormat: 'c'},
		'dataDHA', 'dataNV', 'dataBN1', 'dataBN2', 'dataBN3'
	],
    // data: [
	// 	{ processingDate: '2020-11-01', dataDHA: 20, dataNV: 30, dataBN1: 35, dataBN2: 30, dataBN3: 45},
	// 	{ processingDate: '2020-11-02', dataDHA: 15, dataNV: 40, dataBN1: 45, dataBN2: 40, dataBN3: 55},
	// 	{ processingDate: '2020-11-03', dataDHA: 25, dataNV: 45, dataBN1: 55, dataBN2: 40, dataBN3: 65},
	// 	{ processingDate: '2020-11-04', dataDHA: 20, dataNV: 20, dataBN1: 45, dataBN2: 50, dataBN3: 75},
	// 	{ processingDate: '2020-11-05', dataDHA: 15, dataNV: 55, dataBN1: 35, dataBN2: 60, dataBN3: 85},
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getAmountPackStockedForChart',
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
					 // this.fireEvent('logout');
				} else {
					// console.log(records);
				}
			}
		});
	},

});