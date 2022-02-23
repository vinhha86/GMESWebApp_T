Ext.define('GSmartApp.store.SalTypeLevelStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalTypeLevelStore',
	alias: 'store.SalTypeLevelStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'saltypeid_link',   type: 'int'},
		{name: 'saltype_code',   type: 'string'},
		{name: 'saltype_name',   type: 'string'},
		{name: 'sallevelid_link',   type: 'int'},
		{name: 'sallevel_code',   type: 'string'},
		{name: 'sallevel_name',   type: 'string'},
		{name: 'salratio',   type: 'number'},
		{name: 'salamount',   type: 'integer'}
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(orgid_link, typeid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
		params.typeid_link = typeid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salary/saltype_level_byorg',
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
	loadBySaltypeId:function(saltypeid_link){
		var params = new Object();
		params.saltypeid_link = saltypeid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salary/saltype_level_bysaltypeid',
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
});
