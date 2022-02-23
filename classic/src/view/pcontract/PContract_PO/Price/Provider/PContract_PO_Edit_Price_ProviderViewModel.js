Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.Provider.PContract_PO_Edit_Price_ProviderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_Price_ProviderViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore'
    ],
	stores: {
        ListProviderStore:{
            type : 'ListOrgStore'
        },
    },
    data: {
        
    }
})