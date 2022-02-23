Ext.define('GSmartApp.view.pcontract.PContractConfigAmountViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractConfigAmountViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractConfigAmountStore',
        'GSmartApp.store.pcontract.PContractConfigAmountTypeStore'
    ],
    stores: {
        PContractConfigAmountStore: {
            type: 'PContractConfigAmountStore'
        },
        PContractConfigAmountTypeStore: {
            type: 'PContractConfigAmountTypeStore'
        }
    }
})