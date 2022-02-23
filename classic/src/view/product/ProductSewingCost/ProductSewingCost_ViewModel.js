Ext.define('GSmartApp.view.product.ProductSewingCost.ProductSewingCost_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductSewingCost_ViewModel',
    requires: [
        'GSmartApp.store.product.ProductSewingCostStore',
    ],
    stores: {
        ProductSewingCostStore: {
            type: 'ProductSewingCostStore'
        },
    },
    data: {
        productid_link: null,
    }
})