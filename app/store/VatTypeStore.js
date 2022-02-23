Ext.define('GSmartApp.store.VatTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.VatTypeStore',
    fields: [
		{name: 'id', type: 'string'},
    {name: 'name',  type: 'string'},
    {name: 'code',  type: 'string'},
    {name: 'name_en',  type: 'string'}
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
			url: config.getAppBaseUrl()+'/api/v1/vattype/getall',
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
