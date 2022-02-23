Ext.define('GSmartApp.view.balance.Balance_D_Product_Skus_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Balance_D_Product_Skus_ViewModel',
	requires: ['GSmartApp.store.Balance_D_Product_Sku'],
	stores: {
		Balance_D_Product_Sku: {
			type: 'Balance_D_Product_Sku'
		}
	},
	data: {
		productlist: null
	}
})