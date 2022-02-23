Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_P_Edit_Product_Main_ViewModel',
    requires: [
        'GSmartApp.store.product.ProductStore',
        'GSmartApp.store.product.SKUStore',
    ],
    stores: {
        ProductStore:{
			type: 'ProductStore'
		},
        SKUStore:{
			type: 'SKUStore'
		},
    },
    data: {
        stockid_link: null,
        productSearchString: null,

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