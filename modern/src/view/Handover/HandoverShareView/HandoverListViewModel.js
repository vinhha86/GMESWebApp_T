Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverListViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
    ],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
    },
    data: {
        viewId: null, // handover list view id
    },
    formulas: {
        
    }
})