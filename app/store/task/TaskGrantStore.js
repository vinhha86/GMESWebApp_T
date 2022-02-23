Ext.define('GSmartApp.store.TaskGrantStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TaskGrantStore',
	fields: [
		{name: 'id', type: 'number'},
        {name: 'orgid_link',   type: 'number'},
        {name: 'tasktypeid_link', type: 'number'},
        {name: 'userid_link',   type: 'number'},
        {name: 'orgName', type: 'string'},
        {name: 'taskName',   type: 'string'},
        {name: 'userName', type: 'string'},
	],
	groupField: 'orgName',
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
			url: config.getAppBaseUrl()+'/api/v1/taskgrant/getalltaskgrant',
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
