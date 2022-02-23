Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Print.Stockout_Pklist_Print_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pklist_Print_ViewModel',
    requires: [
        // 'GSmartApp.store.pcontract.PContractStore',
    ],
    stores: {
        PackingListStore:{
			// type: 'PContractStore'
		},
    },
    data: {
        stockout: null,
        storeData: null,
        btnSwitchText: 'Nhóm theo khoang', // 'Nhóm theo mã vải'
    },
    formulas: {
        isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
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
        isKgColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4){
                return false;
            }
            return true;
        },
		isLbsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 5){
                return false;
            }
            return true;
        },
    }
})