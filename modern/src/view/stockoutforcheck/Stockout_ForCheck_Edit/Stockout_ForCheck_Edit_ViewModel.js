Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_ForCheck_Edit_ViewModel',
    requires: [

    ],
	stores:{
		Stockout_order_d_store:{
			type :'Stockout_order_d_store'
		},
        Stockout_order_pkl_Store:{
			type :'Stockout_order_pkl_Store'
		},
        WarehouseCheckStore:{
			type :'WarehouseCheckStore'
		},
		StockinLotStore: {
			type: 'StockinLotStore'
		},
	},
	data: {
		stockout_order: {
			id: null
		},
        stockout: {

        },

		// Stockout_ForCheck_Edit_D
		selectedDRecord: null, // loại vải đang chọn

		// Stockout_ForCheck_Edit_ToVai
        selectedPklRecord: null, // pkl đang chọn (warehouse check)
		pkl_stockout_order_dId: null, // combobox value, hidden
        cbbox_lotnumber_value: null,
		maPklFilter: '', // filter field pkl
		objPkl: null, // obj chứa các trường thông tin,
        isPklTextfieldFocus: false,

		//
        is_stockout_m_view: false, // view có vào từ xuất kho hay không (true), mặc định là tở vải (false)

		// phong to, thu gon
		IsformMaster: true,
        // tooltip
        fieldTooltip: null,
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockin.id') == 0 || get('stockout_order.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		isBtnConfirmHidden: function (get) {
            if (get('stockout_order.status') == 1) {
                return true;
            }else if (get('stockout_order.status') == 0) {
                return false;
            }else {
                return true;
            }
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
        isTabToVaiHidden: function (get) {
			var is_stockout_m_view = get('is_stockout_m_view');
            if(is_stockout_m_view){
                return true; 
            }
			return false;
		},
    },

	
})