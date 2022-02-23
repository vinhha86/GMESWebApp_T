Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Stockout_order_Main_ViewModel',
    requires: [
        'GSmartApp.store.stockout_order.Stockout_order_Store',
        'GSmartApp.store.stockout_order.Stockout_order_d_store',
    ],
    stores: {
        Stockout_order_Store:{
			type: 'Stockout_order_Store'
		},
        Stockout_order_d_store:{
			type: 'Stockout_order_d_store'
		},
    },
    data: {
        stockout_order: {
            id: null,
            timecreate: '',
            stockout_order_d: []
        },
        lenhXuatKhoSearch: null,
        productSearchString: null,
        productStringFilterValue_order: null,
    },
    formulas:{
        // isBtnSelectHidden: function (get) {
        //     if(get('stockout.status') >= 1){ // phiếu đã duyệt, ko cho thêm
        //         return true;
        //     }
        //     return false;
        // },
    }
})