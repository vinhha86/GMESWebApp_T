Ext.define('GSmartApp.view.stockoutforcheck.stockout_forcheck_edit_tovai_detail.Stockout_ForCheck_Edit_ToVai_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_ForCheck_Edit_ToVai_Detail_ViewModel',
	requires: [

	],
	stores:{

	},
	data: {
        stockout_order: null,
        pkl_stockout_order_dId: null,
        selectedDRecord: null,
        selectedPklRecord: null,
        objPkl: null,
        isPklTextfieldFocus: false,
	},
	formulas: {
        isbtnCheckDisabled: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
            var isPklTextfieldFocus = get('isPklTextfieldFocus');
            var objPkl = get('objPkl');
            if(isPklTextfieldFocus){
                return true;
            }
			if(objPkl == null){
                return true;
			}
			return false;
		},
        isMetColumnHidden: function (get) {
            var unitid_link = get('stockout_order.unitid_link');
            if(unitid_link == null){
                return false;
            }else 
            if(unitid_link == 1 || unitid_link == 4 || unitid_link == 5){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout_order.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
        isbtnCheckDisabled: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
            var isPklTextfieldFocus = get('isPklTextfieldFocus');
            var objPkl = get('objPkl');
            if(isPklTextfieldFocus){
                return true;
            }
			if(objPkl == null){
                return true;
			}
			return false;
		},
        isBtnDeletePklHidden: function(get){
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return true;
			}
			return false;
		},
        isEditable: function(get){
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return true;
			}
			return false;
		},
        isReadOnly: function(get){
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return false;
			}
			return true;
		},
        fieldClass: function(get){
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return '';
			}
			return 'notEditable';
		},
        isIos: function(get){
			if(Ext.os.is.iOS){
				// console.log('ios');
				return true;
			}
			// console.log('not ios');
			return false;
		},
    }
})