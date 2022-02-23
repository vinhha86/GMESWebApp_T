Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_TonKho.Stockout_P_TonKho_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_TonKho_ViewModel',
    stores: {
        StockoutD_Store: {
            type: 'Stockout_d' 
        },
	},
	data: {
        stockid_link: null,
        pcontract_poid_link: null,
	}
});
