Ext.define('GSmartApp.view.invoice.invoice_pcontractlist.invoice_pcontractlist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.invoice_pcontractlist_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractStore',
    ],
    stores:{
        PContractStore: {
            type: 'PContractStore'
        },
    },
	data: {
        pcontractSearch: '',
    },
    formulas: {
        
    }
})