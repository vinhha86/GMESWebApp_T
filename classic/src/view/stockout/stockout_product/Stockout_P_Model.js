Ext.define('GSmartApp.view.stockout.Stockout_P_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Model',
    requires: [
        'GSmartApp.store.OrgStore',
        'GSmartApp.store.stockout.Stockout_d',
        'GSmartApp.store.stockout.StockoutTypeStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.Stockout',
        'GSmartApp.store.stockout.StockoutGroupStore'
    ],
    stores: {
        OrgStore:{
			type: 'orgstore'
		},
		Stockout: {
			type: 'stockout'
		},
		StockoutD_Store:{
			type: 'Stockout_d'
		},
		StockoutTypeStore: {
			type: 'StockoutTypeStore'
		},
		OrgFromStore: {
            type: 'ListOrgStore'
		},
		OrgToStore: {
            type: 'ListOrgStore'
		},
		StockoutGroupStore: {
			type: 'StockoutGroupStore'
		},
	},
	data: {
        stockout: null,
        stockout_order: null,
	},
	formulas: {
		
    }
});
