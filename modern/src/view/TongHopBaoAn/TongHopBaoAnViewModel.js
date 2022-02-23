Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TongHopBaoAnViewModel',
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