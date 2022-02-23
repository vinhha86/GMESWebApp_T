Ext.define('GSmartApp.store.encode.warehouse_encode_store', {
    extend: 'Ext.data.Store',
	alias: 'store.warehouse_encode_store',
	model: 'GSmartApp.model.encode.warehouse_encode_model',

	loadStore: function(orgencodeid_link, usercreateid_link, timecreatefrom, timecreateto, limit, page){
		var me=this;
		var params = new Object();
		params.orgencodeid_link = orgencodeid_link;
		params.usercreateid_link = usercreateid_link;
		params.timecreatefrom = timecreatefrom;
		params.timecreateto = timecreateto;

		me.pageSize = limit;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/encode/encode_getlist',
			paramsAsJson:true,
			extraParams : params,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount'
			}
		});
		this.loadPage(page,{
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
	loadByID: function(id){
        var params = new Object();
        params.id = id;		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/encode/encode_getinfo',
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
		// this.loadPage(1,{
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} 
		// 		// else {
        //         //     if (records.length > 0){
        //         //         warehouse_encode = records[0].data;
        //         //         console.log(warehouse_encode);
        //         //     }
		// 		// }
		// 	}
		// });
	}
});
