Ext.define('GSmartApp.store.SalBasicStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalBasicStore',
	alias: 'store.SalBasicStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'orgid_link',   type: 'int'},
		{name: 'sal_basic',   type: 'int'},
		{name: 'sal_min',   type: 'int'},
		{name: 'workingdays',   type: 'int'},
		{name: 'costpersecond',   type: 'int'},
		{name: 'overtime_normal',   type: 'number'},
		{name: 'overtime_weekend',   type: 'number'},
		{name: 'overtime_holiday',   type: 'number'},
		{name: 'overtime_night',   type: 'number'}
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(orgid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salary/salbasic_byorg',
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
	loadStore_Async:function(orgid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salary/salbasic_byorg',
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
