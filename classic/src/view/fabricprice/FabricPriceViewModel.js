Ext.define('GSmartApp.view.fabricprice.FabricPriceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FabricPriceViewModel',
    requires: [
        'GSmartApp.store.fabricprice.FabricPriceStore',
        'GSmartApp.store.CurrencyStore'
    ],
    stores: {
        FabricPriceStore: {
            type: 'FabricPriceStore'
        },
        CurrencyStore: {
            type: 'CurrencyStore'
        },
    }
})