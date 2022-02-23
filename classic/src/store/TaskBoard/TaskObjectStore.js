Ext.define('GSmartApp.store.TaskBoard.TaskObjectStore', {
    extend  : 'Ext.data.Store',
    storeId : 'TaskObjectStore',
    alias: 'store.TaskObjectStore',
    fields: ['objectid_link', 'name','taskobjecttypeid_link', 'objectid_link'],
    sorters: [{
        property: 'objectid_link',
        direction: 'ASC'
    }],
    loadStore: function(taskid_link){
        var params = new Object();
        params.taskid_link = taskid_link;
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/task/get_object_bytask',
			paramsAsJson:true,
            noCache: false,
            extraParams: params,
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