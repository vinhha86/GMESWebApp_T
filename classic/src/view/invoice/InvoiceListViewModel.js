Ext.define('GSmartApp.view.invoice.InvoiceListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvoiceListViewModel',
    requires: ['GSmartApp.store.invoice.Invoice_Store', 'GSmartApp.store.invoice.Invoice_status_store',
            'GSmartApp.store.org.ListOrgStore'],
    stores: {
        Invoice_Store: {
            type: 'Invoice_Store'
        },
        Invoice_status_store: {
            type: 'Invoice_status_store'
        },
        OrgProviderStore: {
            type: 'ListOrgStore'
        }
    },
	data: {
        
    },
})