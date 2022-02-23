Ext.define('GSmartApp.view.stockout.Stockout_EPC_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_EPC_Model',
    stores: {
        TPGroupStore: {
            type: 'TPGroupStore'
        }
    },
	data: {
        stockout: null, 
        stockout_d: null,
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
