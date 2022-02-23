Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_MainViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_ForCheck_MainViewModel',
	stores:{
		Stockout_order_Store:{
			type :'Stockout_order_Store'
		},
	},
	data: {
		is_stockout_m_view: false,
	},
	formulas: {
        
    },

	
})