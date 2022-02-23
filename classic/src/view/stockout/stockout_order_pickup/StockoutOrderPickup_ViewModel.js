Ext.define('GSmartApp.view.stockout.StockoutOrderPickup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockoutOrderPickup_ViewModel',
    stores:{
        OrgProviderStore: {
            type: 'ListOrgStore'
        },
        OrgToStore: {
            type: 'ListOrgStore'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
        Stockout_order_d_store: {
            type: 'Stockout_order_d_store'
        }
    },
	data: {
        stockout_order: {
            id: null,
            timecreate: '',
            stockout_order_d: []
        },
        // stockout_order_code: '',
        // orgid_from_link: null,
        // orgid_to_link: null
    }
})