Ext.define('GSmartApp.view.sync.Folder.CreatedJobViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CreatedJobViewModel',
    requires: ['GSmartApp.store.sync.JobTypeStore'],
    stores: {
        JobTypeStore: {
            type: 'JobTypeStore'
        }
    },
    data: {

    }
});
