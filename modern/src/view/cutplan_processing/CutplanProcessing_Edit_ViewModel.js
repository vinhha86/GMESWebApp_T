Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.CutplanProcessing_Edit_ViewModel',
	stores:{
		CutPlanRowStore:{
			type :'CutPlanRowStore'
		},
		OrgStore:{ // danh sách bàn
			type: 'ListOrgStore'
		},
		Sku:{
			type: 'sku'
		},
		ColorStore:{
			type: 'ColorStore'
		},
		CutplanProcessingDStore:{
			type: 'CutplanProcessingDStore'
		},
	},
	data: {
		cutplanProcessing: { // main obj
			id: null,
			cutplanProcessingD: [],
		},
		porder: null,
		listcolorData: null,
		cutPlanRow: null,

		porderid_link: null,
		pcontractid_link: null,
		productid_link: null,

		cutplanProcessingDObj: {
			lotnumber: null,
			packageid: null,
			met: null,
			la_vai: null,
			tieu_hao: null,
			con_lai: null,
			ps: null,
			warehouseid_link: null,
			epc: null
		},

		warehouseObj: {

		}
	},
	formulas: {
        isBtnAddCutplanProcessingDDisabled: function(get){
			if (get('cutplanProcessingDObj.epc') == null) {
				return true
			}
			return false;
		}
    }
})