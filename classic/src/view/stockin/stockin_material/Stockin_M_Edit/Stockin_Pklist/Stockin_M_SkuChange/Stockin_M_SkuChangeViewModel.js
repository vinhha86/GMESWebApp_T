Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_M_SkuChangeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockin_M_SkuChangeViewModel',
    requires: [
        'GSmartApp.store.stockin.Stockin_d_Store'
    ],
    stores:{
        Stockin_d_Store: {
            type: 'Stockin_d_Store'
        }
    },
	data: {
        stockin_lot: null,
    },
    formulas: {

    }
})