Ext.define('GSmartApp.store.TaskBoard.TaskFlowStatusStore', {
    extend  : 'Ext.data.Store',
    storeId : 'TaskFlowStatusStore',
    alias: 'store.TaskFlowStatusStore',
    fields: ['id', 'name'],
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    loadStore: function(){
		var params = new Object();
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/task/getall_flowstatus',
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
		this.load();
	},
});