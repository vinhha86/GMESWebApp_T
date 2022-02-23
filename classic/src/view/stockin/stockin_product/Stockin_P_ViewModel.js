Ext.define('GSmartApp.view.stockin.Stockin_P_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_P_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockin.Stockin_d_Store',
	'GSmartApp.store.stockin.StockinTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore', 
	'GSmartApp.store.stockin.StockinStatusStore', 'GSmartApp.store.stockin.StockinStore',
	'GSmartApp.store.porder.POrder_ListStore','GSmartApp.store.stockin.StockinGroupStore'],
	stores:{
		StockinTypeStore: {
			type: 'StockinTypeStore'
		},
		OrgFromStore: {
            type: 'ListOrgStore'
		},
		OrgToStore: {
            type: 'ListOrgStore'
		},
		StatusStore:{
			type: 'stockinstatusstore'
		},
		StockinStore: {
			type: 'StockinStore'
		},
		StockinD_Store:{
			type: 'Stockin_d_Store'
		},
		StockinStore_Order: {
			type: 'StockinStore'
		},
		StockinD_Store_Order:{
			type: 'Stockin_d_Store'
		},
		GpayUser: {
			type: 'GpayUserOrg'
		},
	},
	data: {
		stockin: null,
		stockin_order: null,
	},
	formulas: {
        
    }
})