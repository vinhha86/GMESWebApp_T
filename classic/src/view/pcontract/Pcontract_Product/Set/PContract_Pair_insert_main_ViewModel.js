Ext.define('GSmartApp.view.pcontract.PContract_Pair_insert_main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Pair_insert_main_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractProductPairStore'],
    stores: {
        PContractProductPairStore:{
            type: 'PContractProductPairStore'
        },
        PContractProductNotPairStore:{
            type: 'PContractProductPairStore'
        }
    },
    data:{
        id: null,
        pcontractid_link: 0
    }
})