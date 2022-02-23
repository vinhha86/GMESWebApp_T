Ext.define('GSmartApp.view.balance.Balance_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Balance_ViewModel',
    requires: [
			'GSmartApp.store.SKUBalanceStore'
		],	
	stores: {
		BalanceProductStore: {
			type: 'BalanceProductStore'
		},
		SKUBalanceStore: {
			type: 'SKUBalanceStore'
		},
        PContractProductStore: {
            type: 'PContractProductStore'
        },
		Material_ByContract_Store: {
            type: 'PContractProductBom2Store'
        },	
		Product_ByMaterial_Store: {
            type: 'PContractProductBom2Store'
        },		
	},
	data: {
		pcontractid_link: null,
		pcontract_poid_link: null,
		isAdd_Pcontract_Stockin: false,
		ls_productid_link: null,
		IdProduct: 0,
		balance_limit: 0, // 0: tinh het, 1: nguyen lieu, 2: phu lieu
	}
})