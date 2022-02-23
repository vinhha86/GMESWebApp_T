Ext.define('GSmartApp.store.TaskBoard.TaskBoard_Store', {
    extend  : 'Kanban.data.TaskStore',
    model   : 'GSmartApp.model.TaskBoard.TaskBoard_Model',
    storeId : 'TaskBoard_Store',
    alias: 'store.TaskBoard_Store',
    loadStore: function(){
        this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/task/getby_user',
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
    // proxy   : 'memory',
    // data    : [
    //     {
    //         Id          : 1,
    //         Name        : 'Install Chrome',
    //         State       : 'NotStarted',
    //         ResourceId  : 1,
    //         PercentDone : 40,
    //         SubTasks    : [
    //             { Id : 11, Name : 'Start Windows', Done : true, TaskId : 1 },
    //             { Id : 12, Name : 'Open IE', Done : true, TaskId : 1 },
    //             { Id : 13, Name : 'Go to chrome.com', Done : false, TaskId :1 },
    //             { Id : 14, Name : 'Transfer bookmarks', Done : false, TaskId : 1 },
    //             { Id : 15, Name : 'Uninstall IE', Done : false, TaskId : 1 }
    //         ],
    //         Comments    : []
    //     },
    //     {
    //         Id          : 2,
    //         Name        : 'Launch release of v1.4',
    //         State       : 'NotStarted',
    //         ResourceId  : 1,
    //         PercentDone : 33,
    //         SubTasks    : [
    //             { Id : 21, Name : 'Run tests', Done : true, TaskId : 2 },
    //             { Id : 22, Name : 'Check changelog', Done : false, TaskId : 2 },
    //             { Id : 23, Name : 'Upload to FTP', Done : false, TaskId : 2 },
    //             { Id : 24, Name : 'Announce to customers', Done : false, TaskId : 2 }
    //         ],
    //         Comments    : [
    //             { TaskId : 2, Text : 'Some server error during FTP upload', UserId : 2, Date : '2016-02-01' },
    //             { TaskId : 2, Text : 'Just sporadic network failure', UserId : 3, Date : '2016-02-02' }
    //         ]
    //     },
    //     {
    //         Id          : 3,
    //         Name        : 'Plan company trip',
    //         State       : 'InProgress',
    //         ResourceId  : 3,
    //         PercentDone : 40,
    //         SubTasks    : [
    //             { Id : 31, Name : 'Sync calendars', Done : true, TaskId : 3 },
    //             { Id : 32, Name : 'Book flights', Done : true, TaskId : 3 },
    //             { Id : 33, Name : 'Plan teambuilding activities', Done : false, TaskId : 3 },
    //             { Id : 34, Name : 'Gather feedback', Done : false, TaskId : 3 },
    //             { Id : 35, Name : 'Inform team members', Done : false, TaskId : 3 }
    //         ],
    //         Comments    : [
    //             { TaskId : 3, Text : 'This was a tricky task, assigning to Brian for deeper investigation.', UserId : 1, Date : '2016-02-05T14:32:00' },
    //             { TaskId : 3, Text : 'Cannot fix it, re-assigning to Homer', UserId : 3, Date : '2016-02-06T14:42:00' },
    //             { TaskId : 3, Text : 'You amateurs', UserId : 2, Date : '2016-02-07T09:12:00' }
    //         ]
    //     },
    //     {
    //         Id          : 4,
    //         Name        : 'Visit Conference',
    //         State       : 'Done',
    //         Cls         : 'special',
    //         ResourceId  : 1,
    //         PercentDone : 100,
    //         SubTasks    : [
    //             { Id : 41, Name : 'Submit CFP', Done : true, TaskId : 4 },
    //             { Id : 42, Name : 'Get rejected', Done : true, TaskId : 4 },
    //             { Id : 43, Name : 'Buy regular conference ticket', Done : true, TaskId : 4 },
    //             { Id : 44, Name : 'Book flights', Done : true, TaskId : 4 },
    //             { Id : 45, Name : 'Book hotel', Done : true, TaskId : 4 }
    //         ],
    //         Comments    : [
    //             { TaskId : 4, Text : 'Be at the airport lounge section 1.5hrs before departure. ', UserId : 3, Date : '2016-04-06' },
    //             { TaskId : 4, Text : 'Roger that', UserId : 8, Date : '2016-04-07' }
    //         ]
    //     },
    //     {
    //         Id          : 5,
    //         Name        : 'Install Docker',
    //         State       : 'Test',
    //         Cls         : 'special',
    //         Comments    : []
    //     },
    //     {
    //         Id          : 6,
    //         Name        : 'Verify everything working in IE8',
    //         State       : 'Test',
    //         Cls         : 'special',
    //         Comments    : [
    //             { TaskId : 6, Text : '...', UserId : 1, Date : '2016-08-06' }
    //         ]
    //     }
    // ]
});