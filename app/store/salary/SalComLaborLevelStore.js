Ext.define('GSmartApp.store.SalComLaborLevelStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalComLaborLevelStore',
    alias: 'store.SalComLaborLevelStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'salcomid_link',   type: 'int'},
		{name: 'laborlevelid_link',   type: 'int'},
		{name: 'laborlevel_code',   type: 'string'},
		{name: 'laborlevel_name',   type: 'string'}
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(salcomid_link){
		var params = new Object();
		params.salcomid_link = salcomid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/salary/salcom_laborlevel',
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
