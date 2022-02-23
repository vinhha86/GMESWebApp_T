Ext.define('GSmartApp.store.stockin.StockinTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.StockinTypeStore',
    fields: [
		{name: 'id', type: 'string'},
		{name: 'name',   type: 'string'}
	],
	loadStore:function(typeFrom, typeTo){
		var me=this;
		var params = new Object();
		params.typeFrom = typeFrom;
		params.typeTo = typeTo;
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl_Jitin()+'/api/v1/stockin/gettype',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization':  access_token
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
					this.fireEvent('logout');
			   	}
			}
		});
	}
});
