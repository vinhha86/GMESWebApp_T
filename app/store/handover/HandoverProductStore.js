Ext.define('GSmartApp.store.handover.HandoverProductStore', {
    extend: 'Ext.data.Store',
	alias: 'store.HandoverProductStore',
	storeId: 'HandoverProductStore',
	model: 'GSmartApp.model.handover.HandoverProductModel',
    idProperty: 'idx',
	fields: [
		{name: 'idx'},
        {name: 'id', type: 'int'},
		{name: 'totalpackage', type: 'int'},
		{name: 'totalpackagecheck', type: 'int'},
	],
	loadStore:function(handoverid_link){
        var params = new Object();
        params.handoverid_link = handoverid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handoverproduct/getByHandoverId', ///////
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
				}
			}
		});
	},
	loadStore_Async:function(handoverid_link){
        var params = new Object();
        params.handoverid_link = handoverid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/handoverproduct/getByHandoverId', ///////
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
