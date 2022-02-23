Ext.define('GSmartApp.store.TaskType', {
    extend: 'Ext.data.Store',
    alias: 'store.TaskType',
	fields: [
		{name: 'id', type: 'number'},
        {name: 'name',   type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'duration',   type: 'number'}
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
			url: config.getAppBaseUrl()+'/api/v1/taskgrant/getalltasktype',
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
	}
	
});
