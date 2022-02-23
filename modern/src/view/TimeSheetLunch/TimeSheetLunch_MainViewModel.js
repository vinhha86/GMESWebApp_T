Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetLunch_MainViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.TimeSheetLunch.TimeSheetLunchStore'
    ],
    stores: {
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        TimeSheetLunchStore: {
            type: 'TimeSheetLunchStore'
        }
    },
    data: {
        // mobile
        orgId: null,
        // date: null,
    }
})