Ext.define('GSmartApp.store.devicein.DeviceInTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DeviceInTypeStore',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'name',   type: 'string'}
	],
	loadStore:function(){
        var me=this;
        var params = new Object();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/devicein/gettype',
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
			}
		});
	}
});
