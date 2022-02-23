Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PriceDSKUDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PriceDSKUDetailViewModel',
    requires: [
        'GSmartApp.store.CurrencyStore'
    ],
    stores: {
        CurrencyStore: {
            type: 'CurrencyStore'
        },
    },
    data: {
        price_d_sku_record: null, // price d sku record
        price_d_record: null, // price d record
        po_currencyid_link: null,
        
        // fabric price info
        id: null, 
        materialid_link: null,
        price_per_kg: null, 
        m_per_kg: null, 
        price_per_m: null, 
        currencyid_link: null,
    }
})