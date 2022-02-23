Ext.define('GSmartApp.view.stockin.Encode_porder_search_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Encode_porder_search_ViewModel',
	stores:{
		porderStore: {
			type: 'porderSKUStore'
		}
	},
	data: {
		ordercode: '',
		skucode: ''
	}
})