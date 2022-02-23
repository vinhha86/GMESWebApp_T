Ext.define('GSmartApp.view.POrder_Balance.POrderBalance_Sort_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderBalance_Sort_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrderBalanceStore'
    ],
    stores: {
        POrderBalanceStore: {
            type: 'POrderBalanceStore'
        }
    },
    data: {
        porderid_link: null,
        // isABCsortHidden: true
    }
})