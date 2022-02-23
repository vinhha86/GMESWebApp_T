Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit_d_phieukhovai.Stockin_M_Edit_D_PhieuKhoVaiViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_M_Edit_D_PhieuKhoVaiViewModel',
    requires: [
        // 'GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
        // 'GSmartApp.store.invoice.invoice_packinglist_store'
    ],
    stores:{
        // KhoStore: {
        //     type: ''
        // },
        StockinPklStore: {
            type: 'StockinPklStore'
        }
    },
	data: {
        stockin: null,
        stockin_d: null,
        khoArr: [], // arr danh sách khổ (width_check)
    },
    formulas: {
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null || unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
        isCmColumnHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return false;
            }else 
            if(width_unitid_link == 1){
                return false;
            }
            return true;
        },
        isInchColumnHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return true;
            }else 
            if(width_unitid_link == 3){
                return false;
            }
            return true;
        },
    }
})