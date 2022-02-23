Ext.define('GSmartApp.view.sync.SyncViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SyncViewModel',
    requires: ['GSmartApp.store.sync.FolderTreeStore',
        'GSmartApp.store.sync.SyncTaskStore',
        'GSmartApp.store.sync.FileTransferStore',
        'GSmartApp.store.sync.SyncJobStore'],
    stores: {
        FolderTreeStore: {
            type: 'FolderTreeStore'
        },
        FolderDriverStore: {
            type: 'FolderTreeStore'
        },
        SyncTaskStore: {
            type: 'SyncTaskStore'
        },
        FileTransferStore: {
            type: 'FileTransferStore'
        },
        SyncJobStore: {
            type: 'SyncJobStore'
        }
    },
    data: {
        pathDriver: '',
        pathLocal: 'D:/',
        task_selection: null,
        intervalDetail: null,
        isAddFolder: true,
        newFolder: 'New Folder'
    }
});
