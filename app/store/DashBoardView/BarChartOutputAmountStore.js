Ext.define('GSmartApp.store.DashBoardView.BarChartOutputAmountStore', {
    extend: 'Ext.data.Store',
    alias: 'store.BarChartOutputAmountStore',
	storeId: 'BarChartOutputAmountStore',
	// fields: [
	// 	{name: 'sum', type: 'int'},
	// 	{name: 'parentid_link', type: 'int'},
	// 	{name: 'name', type: 'string'},
    // ],

    // fields: ['country', 'agr', 'ind', 'ser'],
    // data: [
    //     { country: 'USA', agr: 188217, ind: 2995787, ser: 12500746 },
    //     { country: 'China', agr: 918138, ind: 3611671, ser: 3792665 },
    //     { country: 'Japan', agr: 71568, ind: 1640091, ser: 4258274 },
    //     { country: 'UK', agr: 17084, ind: 512506, ser: 1910915 },
    //     { country: 'Russia', agr: 78856, ind: 727906, ser: 1215198 }
	// ],
	fields: ['name', 'sum'],
    data: [
        { name: 'USA', sum: 2995 },
        { name: 'China', sum: 3611 },
        { name: 'Japan', sum: 1640 },
        { name: 'UK', sum: 512 },
        { name: 'Russia', sum: 727 }
    ],
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
			url: config.getAppBaseUrl()+'/api/v1/pprocess/getAmountOutputForChart',
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