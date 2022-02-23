Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalanceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductBalanceViewModel',
    requires: [
        'GSmartApp.store.product.ProductSewingCostStore',
        'GSmartApp.store.product.ProductBalanceStore'
    ],
    stores: {
        ProductSewingCostStore: {
            type: 'ProductSewingCostStore'
        },
        ProductBalanceStore: {
            type: 'ProductBalanceStore'
        },
    },
    data: {
        productid_link: null,
    }
})