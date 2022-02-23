Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Recon_Main_Pcontract_ViewModel',
	stores: {
		PContractProductTreeStoreRecon: {
            type: 'PContractProductTreeStore'
        },
		ReconMaterial_Store: {
			type: 'SKUReconStore'
		},
		ReconProduct_Store: {
            type: 'PContractSKUStore'
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
		recondate_to: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
        recondate_from: Ext.Date.add(new Date(), Ext.Date.DAY, -10),
		materialid_link: null
	},
	Balance: {
		materialid_link: null,
		p_selection_mode: 'SINGLE'
	},
})