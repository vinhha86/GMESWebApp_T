Ext.define('GSmartApp.view.sync.SyncViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SyncViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SyncJobStore');
        store.loadStore();
    },
    control: {
        'SyncView': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        //Chuyển tab thì đóng lại interval cập nhật trạng thái
        var inteval = viewmodel.get('intervalDetail');
        clearInterval(inteval);
        if (newCard.xtype == "FolderMainView") {
            var storeDriver = viewmodel.getStore('FolderDriverStore');
            storeDriver.loadFolderDriver(viewmodel.get('pathDriver'));

            var storeLocal = viewmodel.getStore('FolderTreeStore');
            var pathLocal = viewmodel.get('pathLocal');
            storeLocal.loadFolderLocal(pathLocal);
        }
        else if (newCard.xtype == "TaskSyncMainView") {
            var storeTask = viewmodel.getStore('SyncTaskStore');
            storeTask.loadStore();
        }
        else if (newCard.xtype == "SyncJobView") {
            var store = viewmodel.getStore('SyncJobStore');
            store.loadStore();
        }


    }
})