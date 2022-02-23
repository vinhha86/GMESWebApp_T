Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_nplsearch_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.invoice_nplsearch_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractProductStore',
        'GSmartApp.store.pcontract.PContractProductBom2Store',
        'GSmartApp.store.SkuStore'
    ],
    stores:{
        PContractProductStore: {
            type: 'PContractProductStore'
        },
        SkuStore: {
            type: 'skustore'
        },
    },
	data: {
        pcontractid_link: null,
        productid_link: null,
        skucode: '',
        SKUBalanceStore: null
    }
})