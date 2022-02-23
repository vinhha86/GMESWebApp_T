Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_Date_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_Plan_Date_ViewModel',
    requires: [
        // 'GSmartApp.store.pcontract.PContractStore',
    ],
    stores: {
        DateStore:{
			// type: 'DateStore'
		},
    },
    data: {
        pordergrant: null,
    }
})