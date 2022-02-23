Ext.define('GSmartApp.store.Labor.LaborStore', {
    extend: 'Ext.data.Store',
    alias: 'store.LaborStore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'code',  type: 'string'},
        {name: 'name',   type: 'string'},
        {name: 'comment',   type: 'string'}
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
			url: config.getAppBaseUrl()+'/api/v1/laborlevel/getalllaborlevel',
			paramsAsJson:true,
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
				if(!success){
					 // this.fireEvent('logout');
				}
			}
		});
	},
});
