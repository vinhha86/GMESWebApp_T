Ext.define('GSmartApp.view.sync.SyncView', {
    extend: 'Ext.tab.Panel',
    xtype: 'SyncView',
    id: 'SyncView',
    controller: 'SyncViewController',
    viewModel: {
        type: 'SyncViewModel'
    },
    items: [{
        title: '[1] Lịch đồng bộ',
        xtype: 'SyncJobView'
    },
    {
        title: '[2] Danh sách Task',
        xtype: 'TaskSyncMainView'
    },
    {
        title: '[3] Đồng bộ',
        xtype: 'FolderMainView'
    }
    ]
})