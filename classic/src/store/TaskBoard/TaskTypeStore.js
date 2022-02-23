Ext.define('GSmartApp.store.TaskBoard.TaskTypeStore', {
    extend  : 'Ext.data.Store',
    storeId : 'TaskTypeStore',
    alias: 'store.TaskTypeStore',
    fields: ['id', 'name'],
    // proxy   : 'memory',
    // data : [
    //     { Id : 1, Name : 'Mats' },
    //     { Id : 2, Name : 'Homer' },
    //     { Id : 3, Name : 'Brian' },
    //     { Id : 8, Name : 'Lee' }
	// ],
	sorters: [{
		property: 'id',
        direction: 'ASC'
	}],
    loadStore: function(){
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/task/getall_tasktype',
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
	}
});