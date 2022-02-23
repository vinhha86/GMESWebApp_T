Ext.define('GSmartApp.view.pcontract.ListPO_ConfimViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ListPO_ConfimViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        PContractPOStore: {
            type: 'PContractPOStore'
        }
    },
    data: {
        pcontract_poid_link: null
    }
})