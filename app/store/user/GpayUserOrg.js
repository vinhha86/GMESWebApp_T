Ext.define('GSmartApp.store.GpayUserOrg', {
	extend: 'Ext.data.Store',
	storeId: 'GpayUserOrg',
    alias: 'store.GpayUserOrg',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'userid_link',   type: 'int'},
		{name: 'orgid_link',   type: 'int'},
		{name: 'org_grant_id_link',   type: 'int'},
		{name: 'orgcode',   type: 'string'},
		{name: 'orgname',   type: 'string'},
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(userid_link, orgtypeid_link_list){
		var params = new Object();
		params.id = userid_link;
		params.orgtypeid_link_list = orgtypeid_link_list;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_orgview_getall',
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
		// // this.load();
		// this.load({
		// 	scope: this,
		// 	callback: function(records, operation, success) {
		// 		if(!success){
		// 			 this.fireEvent('logout');
		// 		} else {
		// 			// console.log(records);
		// 		}
		// 	}
		// });
	},	
	loadUserInfo:function(userid_link){
		var params = new Object();
		params.id = userid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_getinfo',
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
		// this.load();
		this.load({
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
	loadUserInfo_Async:function(){
		var params = new Object();
		params.id = null;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/user_getinfo',
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
