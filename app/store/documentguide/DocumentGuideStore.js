Ext.define('GSmartApp.store.documentguide.DocumentGuideStore', {
    extend: 'Ext.data.Store',
    alias: 'store.DocumentGuideStore',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'filename',  type: 'string'},
		{name: 'name',   type: 'string'}
    ],
    loadStore:function(){
        var me=this;
        
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/documentguide/getall',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
				//'authorization': access_token
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
	loadByType:function(doctype){
        var me=this;
		var params = new Object();
		params.doctype = doctype;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/documentguide/getall',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
				//'authorization': access_token
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	}
});
