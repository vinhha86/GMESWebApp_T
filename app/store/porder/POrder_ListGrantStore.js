Ext.define('GSmartApp.store.porder.POrder_ListGrantStore', {
    extend: 'Ext.data.Store',
	alias: 'store.POrder_ListGrantStore',
	fields: [
        {name: 'id', type: 'int'},
        {name: 'granttoorgname', type: 'string'},
        {name: 'start_date_plan', type: 'date', dateFormat: 'c'},
        {name: 'finish_date_plan', type: 'date', dateFormat: 'c'},
        {name: 'grantamount', type: 'int'}
	],
	// groupField: 'ordercode',
	sorters: [{
        direction: 'ASC',
        property: 'start_date_plan'
	}],
	loadStore: function(porderid){
		var me=this;
		var params = new Object();
		params.porderid = porderid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getgrantbyporderid',
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
		this.load();
	},
	loadStore_async: function(porderid){
		var me=this;
		var params = new Object();
		params.porderid = porderid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/porderlist/getgrantbyporderid',
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
	}
});
