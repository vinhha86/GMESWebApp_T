Ext.define('GSmartApp.view.invoice.InvoicePickup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvoicePickup_ViewModel',
    stores:{
        OrgProviderStore: {
            type: 'ListOrgStore'
        },
        OrgToStore: {
            type: 'ListOrgStore'
        },
        InvoiceList_Store: {
            type: 'Invoice_Store'
        }
    },
	data: {
        invoice: {
            id: null,
            invoicedate: '',
            invoice_d: []
        }
    }
})