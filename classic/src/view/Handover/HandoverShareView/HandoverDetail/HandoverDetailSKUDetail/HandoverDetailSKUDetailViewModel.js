Ext.define('GSmartApp.view.handover.HandoverDetailSKUDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailSKUDetailViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverSkuStore',
    ],
    stores: {
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
    },
    data: {
        handoverid_link: null, 
        handoverproductid_link: null, 
        porderid_link: null, 
        productid_link: null,
        viewId: '',
        data: null, // pack to stock, loadSkuCodePackToStockWindow
    }
})