Ext.define('GSmartApp.view.pcontract.PContractInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractInfoViewModel',
    requires: ['GSmartApp.store.pcontract.PContractProductTreeStore'],
    stores: {
        PContractProductTreeStore: {
            type: 'PContractProductTreeStore'
        }
    },
    data: {
        pcontractid_link: 0,
        productid_link: 0,
        potype: 10
    }
})