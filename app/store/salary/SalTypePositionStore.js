Ext.define('GSmartApp.store.SalTypePositionStore', {
	extend: 'Ext.data.Store',
	storeId: 'SalTypePositionStore',
    alias: 'store.SalTypePositionStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'saltypeid_link',   type: 'int'},
		{name: 'positionid_link',   type: 'int'},
		{name: 'position_code',   type: 'string'},
		{name: 'position_name',   type: 'string'}
	],
	sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
	loadStore:function(saltypeid_link){
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
			url: config.getAppBaseUrl()+'/api/v1/salary/saltype_position',
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
