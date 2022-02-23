Ext.define('GSmartApp.store.CurrencyStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurrencyStore',
	fields: [
		{name: 'id'},
		{name: 'code', type:'string'},
		{name: 'name', type:'string'},
        {name: 'exchangerate', type:'number'},
        {name: 'status', type:'int'}
	],
	// data:[
	// 	{id:1,	name:'USD'},
	// 	{id:2,	name:'EUR'},
	// 	{id:3,	name:'CHN'}
	// ],
	loadStore:function(){
		var me=this;
		var params = new Object();
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/currency/getall',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': access_token
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
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	}
});
