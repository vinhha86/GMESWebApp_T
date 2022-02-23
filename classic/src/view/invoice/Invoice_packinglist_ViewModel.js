Ext.define('GSmartApp.view.invoice.Invoice_packinglist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Invoice_packinglist_ViewModel',
    requires: ['GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
            'GSmartApp.store.invoice.invoice_packinglist_store'],
    stores:{
        LotStore: {
            type: 'invoice_pkl_lotnumber_store'
        },
        PackingListStore: {
            type: 'invoice_packinglist_store'
        }
    },
	data: {
        lotnumber: {
            lot: '',
            size: ''
        },
        packinglist: {
            id: null,
            invoiceid_link: 0,
            invoicedid_link: 0,
            skuid_link: 0,
            lotnumber: '',
            sizenumber: '',
            packageid: null,
            ydsorigin: null,
            met_origin: null,
            m3: null,
            netweight: null,
            grossweight: null,
            width: null
        },
        invoice: null,
        invoiceDRec: null 
    }
})