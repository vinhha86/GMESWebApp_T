Ext.define('GSmartApp.store.porder.POrderBalanceStore', {
    extend: 'Ext.data.Store',
    storeId: 'POrderBalanceStore',
	alias: 'store.POrderBalanceStore',
	// groupField: 'granttoorgname',
    // pageSize: 25,
    fields: [
		{name: 'id', type: 'int'},
		{name: 'balance_name', type: 'string'},
        {name: 'sortvalue', type: 'int'},
	],
	loadStore: function(porderid_link){
        var params = new Object();
        params.porderid_link = porderid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_balance/getByPorder',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
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
	loadStoreByPorderAndPorderGrant: function(porderid_link, pordergrantid_link){
        var params = new Object();
		params.porderid_link = porderid_link;
		params.pordergrantid_link = pordergrantid_link;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porder_balance/getByPorderAndPorderGrant',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
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
});
