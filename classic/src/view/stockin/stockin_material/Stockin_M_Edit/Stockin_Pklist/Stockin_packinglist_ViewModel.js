Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_packinglist_ViewModel',
    requires: [
        // 'GSmartApp.store.invoice.invoice_pkl_lotnumber_store', 
        'GSmartApp.store.stockin.StockinPklStore'
    ],
    stores:{
        LotStore: {
            // type: 'invoice_pkl_lotnumber_store'
        },
        PackingListStore: {
            type: 'StockinPklStore'
        }
    },
	data: {
        lotnumber: {
            lot: '',
            size: ''
        },
        packinglist: {
            id: null,
            invoiceid_link: 0,
            invoicedid_link: 0,
            skuid_link: 0,
            lotnumber: '',
            sizenumber: '',
            packageid: null,
            ydsorigin: null,
            m3: null,
            netweight: null,
            grossweight: null,
            width: null,
            width_met: null,
            width_met_check: null
        },
        invoice: null,
        invoiceDRec: null,
        stockin: null,
        stockinDRec: null,
        curentLot: null,
    },
    formulas: {
        isUploadBtnHidden: function(get){
            var stockinDRec = get('stockinDRec');
            if(stockinDRec != null){
                if(isNaN(stockinDRec.get('id'))){
                    return true;
                }else{
                    return false;
                }
            }
            return true;
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return false;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
        isKgColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4){
                return false;
            }
            return true;
        },
        isLbsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 5){
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