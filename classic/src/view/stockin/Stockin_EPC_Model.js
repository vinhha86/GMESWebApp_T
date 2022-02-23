Ext.define('GSmartApp.view.stockin.Stockin_EPC_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_EPC_Model',
	stores: {
        TPGroupStore: {
            type: 'TPGroupStore'
        }
    },
	data: {
        stockin: null, 
        stockin_d: null,
        isAutoChecked: false,
        TPGroupStoreValue: null,
    },
    formulas: {
		isEpcTxtfieldHidden: function (get) {
            if (get('isAutoChecked') == true) {
                return true;
            }
            else {
                return false;
            }
        },
    }
});
