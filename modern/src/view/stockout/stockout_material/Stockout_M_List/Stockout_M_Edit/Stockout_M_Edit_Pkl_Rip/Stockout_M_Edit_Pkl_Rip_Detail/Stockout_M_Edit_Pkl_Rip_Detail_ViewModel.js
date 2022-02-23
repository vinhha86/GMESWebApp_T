Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_pkl.Stockout_M_Edit_Pkl_Rip_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_M_Edit_Pkl_Rip_Detail_ViewModel',
	requires: [

	],
	stores:{

	},
	data: {
        stockout: null,
        pklRip_stockoutdId: null,
        selectedDRecord: null,
        selectedPklRecord: null,
        objPkl: null,
        isPklTextfieldFocus: false,
	},
	formulas: {
        isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return false;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isobjRipSelected: function (get) {
            var objRip = get('objRip');
            var isTextFieldFocus = get('isTextFieldFocus');
            if(objRip == null){
                return false;
            }
            if(isTextFieldFocus == true){
                return false;
            }
            return true;
        },
        isPklSelected: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return false;
			}
			return true
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
    }
})