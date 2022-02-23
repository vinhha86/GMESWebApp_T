Ext.define('GSmartApp.view.handover.HandoverLineToPrint_Detail_PorderSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverLineToPrint_Detail_PorderSearchViewModel',
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