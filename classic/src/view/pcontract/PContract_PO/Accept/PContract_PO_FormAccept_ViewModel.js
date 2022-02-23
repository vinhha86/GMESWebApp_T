Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_FormAccept_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.UserListStore'],
    stores:{
        OrgStore: {
            type: 'ListOrgStore'
        },
        UserStore: {
            type: 'userliststore'
        }     
    },
    data: {
        po: {
            po_buyer: '',
            po_vendor: '',
            shipdate: new Date(),
            po_quantity: 0,
            id: 0,
            orgbuyerid_link: 0,
            orgid_link: 0
        }
    }
})