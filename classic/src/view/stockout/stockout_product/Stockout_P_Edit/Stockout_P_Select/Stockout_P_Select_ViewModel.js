Ext.define('GSmartApp.view.stockout.Stockout_P_Select_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Select_ViewModel',
    stores: {
		Stockout: {
			type: 'stockout'
		},
        GpayUser: {
			type: 'GpayUserOrg'
		},
	},
    data: {
        status: null
    }
});
