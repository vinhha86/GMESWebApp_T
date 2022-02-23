Ext.define('GSmartApp.view.TaskBoard.TaskEditor_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskEditor_ViewModel',
    requires: [
        'GSmartApp.store.TaskBoard.TaskBoard_Store',
        'GSmartApp.store.TaskBoard.TaskUser_Store',
        'GSmartApp.store.TaskBoard.TaskFlowStatusStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.TaskBoard.TaskObjectStore'
    ],
    stores: {
        TaskUser_Store : {
            type: 'TaskUser_Store'
        },
        FlowStatusStore: {
            type: 'TaskFlowStatusStore'
        },
        TaskUser_Store_Full: {
            type: 'TaskUser_Store'
        },
        OrgStore: {
            type : 'ListOrgStore'
        },
        TaskObjectStore: {
            type: 'TaskObjectStore'
        }
    },
    data: {
        ishidden_add_checklist: true,
        isdisable_checkbox: false,
        flow_status: 3,
        isedit_comment: true,
        comment: '',
        btncomment: false,
        btnreject : true,
        btnaccept: true,

        objecttype: 0
    }
})