Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance_Sort_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductBalance_Sort_ViewModel',
    requires: [
        'GSmartApp.store.product.ProductBalanceStore'
    ],
    stores: {
        ProductBalanceStore: {
            type: 'ProductBalanceStore'
        }
    },
    data: {
        productid_link: null,
        // isABCsortHidden: true
    }
})