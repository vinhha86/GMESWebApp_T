Ext.define('GSmartApp.store.device.device_store', {
    extend: 'Ext.data.Store',
	alias: 'store.device_store',
    model: 'GSmartApp.model.device.device_model',
    groupField: 'deviceGroupName',
    loadStore:function(type,callback){
		var me=this;
		//var access_token = JitinApp.Ajax.access_token();
		var params = new Object();
		params.type = type;
		
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/device/device_listtree',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
				//'authorization': access_token
			 },
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				// callback.call(records, operation, success);
				if(!success){
					// this.fireEvent('logout');
			   }
			}
		});
	},
	loadStoreByOrgGovern:function(org_governid_link){
		var me=this;
		var params = new Object();
		params.org_governid_link = org_governid_link;
		//var access_token = JitinApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/device/deviceGetByOrg',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
				//'authorization': access_token
			 },
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.loadPage(1,{
			scope: this,
			callback: function(records, operation, success) {
				// callback.call(records, operation, success);
				if(!success){
					// this.fireEvent('logout');
			   }
			}
		});
	}
});
