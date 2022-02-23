Ext.define('GSmartApp.store.SalLevelStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalLevelStore',
	alias: 'store.SalLevelStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'code',   type: 'string'},
		{name: 'name',   type: 'string'},
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
			url: config.getAppBaseUrl()+'/api/v1/salary/saltype_byorg',
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
