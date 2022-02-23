Ext.define('GSmartApp.view.invoice.InvoiceEdit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvoiceEdit_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores:{
        OrgProviderStore: {
            type: 'ListOrgStore'
        },
        OrgToStore: {
            type: 'ListOrgStore'
        },
        PortFromStore: {
            type: 'ListOrgStore'
        },
        PortToStore: {
            type: 'ListOrgStore'
        },
        UnitStore: {
            type: 'UnitStore'
        },
        BalanceProductStore: {
			type: 'BalanceProductStore'
		},
		SKUBalanceStore: {
			type: 'SKUBalanceStore'
		},
    },
	data: {
        IsformMaster: false,
        invoice: {
            id: null,
            invoicedate: new Date(),
            invoice_d: []
        },
        skucode: '',
    },
    formulas: {
        isMetColumnHidden: function (get) {
            var unitid_link = get('invoice.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('invoice.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
    }
})