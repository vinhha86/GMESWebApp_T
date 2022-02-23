Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pklist_Main_ViewModel',
    requires: [
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
    stores: {
        StockStore:{
			// type: 'StockStore'
		},
        WarehouseStore:{
			type: 'WarehouseStore'
		},
    },
    data: {
        skuid_link: null,
        stockout: null,
        stockoutDRec: null,
        storeData: null,

        //
        totalcay: 0,
        totaldai: 0,
        totaldaiyard: 0,
        totalkg: 0,
        totallbs: 0,
    },
    formulas:{
        isBtnSelectHidden: function (get) {
            if(get('stockout.status') >= 1){ // phiếu đã duyệt, ko cho thêm
                return true;
            }
            return false;
        },
        
        isBtnThemMatTemHidden: function (get) {
            if(get('stockout.status') >= 1){ // phiếu đã duyệt, ko cho thêm
                return true;
            }
            if(get('stockout.stockouttypeid_link') == 2){ // xuat dieu chuyen
                return true;
            }
            return false;
        },
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