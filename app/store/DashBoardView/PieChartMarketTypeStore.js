Ext.define('GSmartApp.store.DashBoardView.PieChartMarketTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.PieChartMarketTypeStore',
    storeId: 'PieChartMarketTypeStore',
	
	fields: [
        {name: 'sum', type: 'int'},
        {name: 'marketName', type: 'string'},
    ],
    // data: [
    //     {
    //         "sum": 726741,
    //         "marketName": "Châu Âu"
    //     },
    //     {
    //         "sum": 58904,
    //         "marketName": "Hồng Kông"
    //     },
    //     {
    //         "sum": 105434,
    //         "marketName": "Mỹ"
    //     },
    //     {
    //         "sum": 158548,
    //         "marketName": "Khác"
    //     }
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
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getForMarketTypeChart',
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