Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_MainViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockout_M_MainViewModel',
	stores:{
		Stockout: { // grid Phiếu xuất (đầu tiên)
			type: 'stockout'
		},
		Stockout_order_Store: { // grid Yêu cầu xuất (thứ 2)
            type: 'Stockout_order_Store'
        },
		Stockout_order_d_store: { // grid Yêu cầu xuất (thứ 2)
            type: 'Stockout_order_d_store'
        },
	},
	data: {
		
	},
	formulas: {
        
    },

	
})