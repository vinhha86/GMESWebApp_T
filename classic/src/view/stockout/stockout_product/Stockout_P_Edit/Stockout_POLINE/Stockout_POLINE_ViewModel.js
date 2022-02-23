Ext.define('GSmartApp.view.stockout.Stockout_POLINE_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_POLINE_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        POLineStore: {
            type: 'PContractPOStore' 
        }
	},
	data: {
        po_buyer: ''
	}
});
