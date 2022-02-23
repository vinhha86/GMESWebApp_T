Ext.define('GSmartApp.view.pcontract.PContract_Porder.Form_SelectOrg_PorderReq_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Form_SelectOrg_PorderReq_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        orgid_link: 0,
        amount: 0,
        pcontractpo_id_link: 0,
        pcontractid_link: 0,
        productid_link: 0
    }
})