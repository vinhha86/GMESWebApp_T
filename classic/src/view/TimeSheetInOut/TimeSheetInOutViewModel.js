Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TimeSheetInOutViewModel',
    requires: ['GSmartApp.store.TimeSheetInOut.TimeSheetInOutStore', 'GSmartApp.store.org.ListOrgStore'],

    stores: {
        TimeSheetInoutStore: {
            type: 'TimeSheetInOutStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        timesheetinout: {
            todate: null,
            fromdate: null,
            orgid_link: 0
        }
    }
})