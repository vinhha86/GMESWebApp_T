Ext.define('GSmartApp.view.pcontract.All_line_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.All_line_Edit_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        PContractProductPOStore: {
            type: 'PContractPOStore'
        }
    },
    data: {
        pcontractid_link: 0,
        productid_link: 0,
        potype: 10
    }
})