Ext.define('GSmartApp.store.ColorStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ColorStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'rgbvalue',   type: 'string'},
		{name: 'name',   type: 'string'},
		{name: 'name_en',   type: 'string'}
	],
	loadStore:function(type){
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
			 url: config.getAppBaseUrl()+'/api/v1/color/getColorAll',
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
