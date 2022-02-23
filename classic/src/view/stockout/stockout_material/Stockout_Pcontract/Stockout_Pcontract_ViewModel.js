Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Pcontract_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractStore',
        'GSmartApp.store.stockout.Stockout_d'
    ],
    stores: {
        PContractStore:{
			type: 'PContractStore'
		},
        StockoutD_Store:{
			type: 'Stockout_d'
		},
    },
    data: {
        stockout: null,
        pcontractid_link: null,
        stockout_pcontractid_link: null,
        productid_link: null,
    },
    formulas:{
        // is_Stockout_Pcontract_View_2_hidden: function (get) {
        //     var stockout = get('stockout');
        //     if(stockout != null){
        //         var stockouttypeid_link = stockout.stockouttypeid_link;
        //         if(stockouttypeid_link == 1){ // xuat cat
        //             return true;
        //         }
        //         if(stockouttypeid_link == 2){ // xuat dieu chuyen
        //             return false;
        //         }
        //     }
        //     return true;
        // }
    }
})