Ext.define('GSmartApp.store.encode.warehouse_encode_epc_store', {
    extend: 'Ext.data.Store',
	alias: 'store.warehouse_encode_epc_store',
	model: 'GSmartApp.model.encode.warehouse_encode_epc_model',
	loadByEncodeID: function(id){
        var params = new Object();
		params.id = id;	
		console.log(id);	
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/encode/encode_getepc',
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
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} 
				// else {
				// 	console.log(records);
				// }

			}
		});
	}   
});
