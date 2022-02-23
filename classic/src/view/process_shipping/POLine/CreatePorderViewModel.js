Ext.define('GSmartApp.view.process_shipping.POLine.CreatePorderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CreatePorderViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        OrgGrantStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        startdate: new Date(),
        pcontract_poid_link: 0,
        productid_link: 0
    }
})