Ext.define('GSmartApp.store.DashBoardView.LineChartRegisterCodeCountStore', {
    extend: 'Ext.data.Store',
    alias: 'store.LineChartRegisterCodeCountStore',
    storeId: 'LineChartRegisterCodeCountStore',
	
	fields: [
		{name: 'registerDate',   type: 'date', dateFormat: 'c'},
		'dataDHA', 'dataNV', 'dataBN1', 'dataBN2', 'dataBN3'
	],
    // data: [
	// 	{ registerDate: '2020-10-18', registerCodeCount: 2477},
	// 	{ registerDate: '2020-10-19', registerCodeCount: 2025},
	// 	{ registerDate: '2020-10-20', registerCodeCount: 2250},
	// 	{ registerDate: '2020-10-21', registerCodeCount: 2340},
	// 	{ registerDate: '2020-10-22', registerCodeCount: 2700},
	// 	{ registerDate: '2020-10-23', registerCodeCount: 2260},
	// 	{ registerDate: '2020-10-24', registerCodeCount: 2570},
	// 	{ registerDate: '2020-10-25', registerCodeCount: 2640},
	// 	{ registerDate: '2020-10-26', registerCodeCount: 2420},
	// 	{ registerDate: '2020-10-27', registerCodeCount: 2380},
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
			url: config.getAppBaseUrl()+'/api/v1/timesheet/getForRegisterCodeCountChart',
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