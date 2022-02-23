Ext.define('GSmartApp.view.handover.Handover_kho_tocut_packinglist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Handover_kho_tocut_packinglist_ViewModel',
    requires: [
        // 'GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
        // 'GSmartApp.store.invoice.invoice_packinglist_store'
    ],
    stores:{
        LotStore: {
            // type: 'invoice_pkl_lotnumber_store'
        },
        PackingListStore: {
            // type: 'invoice_packinglist_store'
        }
    },
	data: {
        lotnumber: {
            lot: '',
            size: ''
        },
        packinglist: {
            id: null,
            skuid_link: 0,
            lotnumber: '',
            sizenumber: '',
            packageid: null,
            ydsorigin: null,
            m3: null,
            netweight: null,
            grossweight: null,
            width: null
        },
        invoice: null,
        invoiceDRec: null 
    }
})