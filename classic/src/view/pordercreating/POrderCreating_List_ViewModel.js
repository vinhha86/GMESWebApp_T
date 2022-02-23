Ext.define('GSmartApp.view.pordercreating.POrderCreating_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderCreating_List_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractStore', 'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.branch.BranchStore','GSmartApp.season.SeasonStore'],
    stores: {
        PContractStore: {
            type: 'PContractStore'
        },
        CustomerStore:{
            type : 'ListOrgStore'
        },
        BranchStore:{
            type :'BranchStore'
        },
        SeasonStore:{
            type :'SeasonStore'
        }
    }
})