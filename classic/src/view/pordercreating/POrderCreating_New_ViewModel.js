Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderCreating_New_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractProductStore',
    'GSmartApp.store.pcontract.PContractSKUStore', 'GSmartApp.store.org.ListOrgStore',
    'GSmartApp.branch.BranchStore',
    'GSmartApp.season.SeasonStore','GSmartApp.store.porder.porderSKUStore'],
    stores: {
        PContractProductStore: {
            type: 'PContractProductStore'
        },
        PContractSKUStore: {
            type: 'PContractSKUStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        CustomerStore:{
            type : 'ListOrgStore'
        },
        BranchStore:{
            type :'BranchStore'
        },
        SeasonStore:{
            type :'SeasonStore'
        },
        Vender:{
            type : 'ListOrgStore'
        },
        EndBuyer:{
            type : 'ListOrgStore'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },
        porders: {
            type: 'POrderFilter'
        }
    },
    data:{
        pcontractid_link: 0,
        productid_link: 0,
        org_order_id_link: 0,
        PContract: {

        },
        id: null,
        ordercode: '',
        orderdate: new Date()
    }
})