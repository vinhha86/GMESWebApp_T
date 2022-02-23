Ext.define('GSmartApp.view.TaskGrid.TaskGridViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskGridViewModel',
    requires: [
        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store',
        'GSmartApp.store.TaskBoard.TaskTypeStore',
        'GSmartApp.store.TaskBoard.TaskStatusStore'
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
        },
        TaskStatusStore: {
            type: 'TaskStatusStore'
        },
        OrgStore: {
            type : 'ListOrgStore'
        },
    },
    data: {
        isTaskBoardHidden: false,
        isTaskGridHidden: true
    }
})