Ext.define('GSmartApp.view.POrder_Balance.POrderBalanceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderBalanceViewModel',
    requires: [
        'GSmartApp.store.porder.PorderSewingCostStore',
        'GSmartApp.store.porder.POrderBalanceStore'
    ],
    stores: {
        PorderSewingCostStore: {
            type: 'PorderSewingCostStore'
        },
        POrderBalanceStore: {
            type: 'POrderBalanceStore'
        },
    },
    data: {
        porderid_link: null,
    }
})