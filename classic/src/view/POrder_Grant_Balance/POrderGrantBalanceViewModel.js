Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalanceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderGrantBalanceViewModel',
    requires: [
        'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.porder.POrderBalanceStore'
    ],
    stores: {
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        POrderBalanceStore: {
            type: 'POrderBalanceStore'
        },
    },
    data: {
        porderid_link: null,
        porder_grantid_link: null,
    }
})