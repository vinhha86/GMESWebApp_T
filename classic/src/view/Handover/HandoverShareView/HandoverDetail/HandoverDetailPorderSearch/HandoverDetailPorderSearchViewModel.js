Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailPorderSearchViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStore',
    ],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
    },
    data: {
        viewId: '' // id HandoverDetail view
    }
})