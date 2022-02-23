Ext.define('GSmartApp.view.TaskBoard.TaskBoardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskBoardViewModel',
    requires: [
        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store',
        'GSmartApp.store.TaskBoard.TaskTypeStore'
    ],
    stores: {
        TaskBoard_Store: {
            type: 'TaskBoard_Store'
        },
        TaskUser_Store : {
            type: 'TaskUser_Store'
        },
        TaskTypeStore: {
            type: 'TaskTypeStore'
        }
    },
    data: {
        isTaskBoardHidden: false,
        isTaskGridHidden: true
    }
})