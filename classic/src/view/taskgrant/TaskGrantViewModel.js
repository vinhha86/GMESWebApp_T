Ext.define('GSmartApp.view.taskgrant.TaskGrantViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TaskGrantViewModel',
    requires: [
        'GSmartApp.store.TaskGrantStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.TaskType',
        'GSmartApp.store.UserListStore'
    ],
    stores: {
        TaskGrantStore: {
            type: 'TaskGrantStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        TaskType: {
            type: 'TaskType'
        },
        UserListStore: {
            type: 'userliststore'
        },
    },
    data: {
        id: null, // for TaskGrantForm(create, delete)
        orgid_link: null,
        tasktypeid_link: null,
        userid_link: null,

        // for edit
        isOrgCbBoxReadonly: null,
        isTasktypeCbBoxReadonly: null,
    }
})