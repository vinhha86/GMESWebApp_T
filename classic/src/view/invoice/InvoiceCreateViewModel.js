Ext.define('GSmartApp.view.invoice.InvoiceCreateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvoiceCreateViewModel',
	data: {
        btnplus: true,
        isbtnclose: false,
		isAddnew:true,
		invoice_id:null,
		IsformMaster:false
    },
})