Ext.define('GSmartApp.store.TaskBoard.TaskCommentStore', {
    extend: 'Ext.data.Store',
    alias: 'store.TaskCommentStore',
	fields: [
		{name: 'typename', type:'string'},
		{name: 'text', type:'string'},
        {name: 'date', type:'date', dateFormat: 'c'},
        // {name: 'date', type:'string', 
        //     // convert: function (value) {
        //     //     return Ext.Date.parse(value, 'c');
        //     // }
        // },
        {name: 'userId', type:'int'},
        {name: 'taskId', type:'int'}
	],
	loadStore:function(taskid){
		var me=this;
		var params = new Object();
		params.taskid = taskid;
		var access_token = GSmartApp.Ajax.access_token();
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			 url: config.getAppBaseUrl()+'/api/v1/task/getcommentbytask',
			paramsAsJson:true,
			noCache: false,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': access_token
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
					 // this.fireEvent('logout');
				}
			}
		});
	}
});
