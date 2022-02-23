Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.Stockout_M_EditViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_M_EditViewModel',
	stores:{
		Stockout_d: {
			type: 'Stockout_d'
		},
		stockout_pklist: {
			type: 'stockout_pklist'
		},
		stockout_pklist_rip: {
			type: 'stockout_pklist'
		},
	},
	data: {
		stockout: null,

		// Stockout_M_Edit_D
		selectedDRecord: null, // loại vải đang chọn

		// Stockout_M_Edit_Pkl
		selectedPklRecord: null, // pkl đang chọn
		pkl_stockoutdId: null, // kiểm cây combobox value
		maPklFilter: '', // filter field pkl
        objPkl: null, // obj de them hoac update pkl
        isFocusTxtField: false,

		// Stockout_M_Edit_Pkl_Rip
		selectedPklRipRecord: null, // pkl xé vải đang chọn
		pklRip_stockoutdId: null, // xé vải combobox value
		maPklRipFilter: '', // filter field pkl xé vải
		objRip: null, // obj chứa các trường thông tin,
        currentEditField: null, // đang edit textfield nào
        isTextFieldFocus: false,

		// phong to, thu gon
		IsformMaster: true,
        // tooltip
        fieldTooltip: null,
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
    },

	
})