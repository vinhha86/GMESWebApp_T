Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_SubM_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore','GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore', 
		'GSmartApp.store.stockin.StockinStatusStore', 'GSmartApp.store.stockin.StockinStore',
		'GSmartApp.store.porder.POrder_ListStore','GSmartApp.store.stockin.StockinGroupStore',
		'GSmartApp.store.unit.UnitStore',
	],
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
		StockinD_Store: {
			type: 'Stockin_d_Store'
		},
		Stockin_Order_Store: {
			type: 'StockinStore'
		},
		Stockin_Order_D_Store:{
			type: 'Stockin_d_Store'
		},
		GpayUser: {
			type: 'GpayUserOrg'
		},
        UnitStore: {
            type: 'UnitStore'
        },
	},
	data: {
		searchObj: {
			stockindate_from: new Date(),
			stockindate_to: new Date(),
			orgid_from_link: null,
			stockintypeid_link: null,
		}
	},
	formulas: {
        
    }
})