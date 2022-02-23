Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_POLINE_Main_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore'],
    stores: {
        POLineStore: {
            type: 'PContractPOStore' 
        },
        PContractSKUStore: {
            type: 'PContractSKUStore' 
        }
	},
	data: {
        po_buyer: '',
        poData: {
            id: null,
            po_buyer: null,
        },
        isDsPOLineHidden: false,
	}
});
