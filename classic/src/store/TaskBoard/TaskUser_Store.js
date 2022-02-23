Ext.define('GSmartApp.store.TaskBoard.TaskUser_Store', {
    extend  : 'Kanban.data.TaskStore',
    storeId : 'TaskUser_Store',
    alias: 'store.TaskUser_Store',
    // proxy   : 'memory',
    // data : [
    //     { Id : 1, Name : 'Mats' },
    //     { Id : 2, Name : 'Homer' },
    //     { Id : 3, Name : 'Brian' },
    //     { Id : 8, Name : 'Lee' }
    // ],
    loadUserbyOrg: function(orgid_link){
		var params = new Object();
		params.orgid_link = orgid_link;
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/users/getbyorg',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
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