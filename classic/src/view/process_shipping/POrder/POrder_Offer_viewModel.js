Ext.define('GSmartApp.view.process_shipping.POrder_Offer_viewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Offer_viewModel',
    requires: ['GSmartApp.store.porder.POrder_ListStore'],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        }
    },
    data: {
        store: null,
        pcontract_poid_link: 0,
        productid_link: 0,
        shipdate: null
    }
})