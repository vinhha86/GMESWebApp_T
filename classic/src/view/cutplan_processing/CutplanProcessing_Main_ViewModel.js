Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.CutplanProcessing_Main_ViewModel',
	stores:{
		POrder_ListStore: {
			type :'POrder_ListStore'
		},
		CutplanProcessingStore:{
			type :'CutplanProcessingStore'
		},
		CutplanProcessingDStore:{
			type :'CutplanProcessingDStore'
		},
		ListOrgStore:{
			type :'ListOrgStore'
		},
		POrder_AutoComplete: {
			type :'POrder_AutoComplete'
		},
		Product_AutoComplete: {
			type :'Product_AutoComplete'
		},
		Sku:{
			type: 'sku'
		},
        POrderLineChartStore: {
            type: 'POrderLineChart'
        },
		CutplanProcessingLineChartStore: {
            type: 'CutplanProcessingLineChart'
        },
	},
	data: {
		// search porder
		porderSearchObj: {
			donvi: null,
			lenhsx: null,
			sanpham: null,

		},
		iscombo_DonVi_editable: true,
		//
		porder: null,
		// search cutplan_processing
		maNPL_id: null,
		fromDate: null, // tim kiem
        toDate: null, // tim kiem
	},
	formulas: {
		isPOrder_AutoComplete_disable: function (get) {
			var donvi = get('porderSearchObj.donvi');
			if (donvi == null || isNaN(donvi)){
				return true;
			}
			return false;
		},
		isProduct_AutoComplete_disable: function (get) {
			var donvi = get('porderSearchObj.donvi');
			if (donvi == null || isNaN(donvi)){
				return true;
			}
			return false;
		},
		isbtnSearchPorder_disable: function (get) {
			var donvi = get('porderSearchObj.donvi');
			var lenhsx = get('porderSearchObj.lenhsx');
			var sanpham = get('porderSearchObj.sanpham');
			if (donvi == null || isNaN(donvi)){
				return true;
			}
			if (lenhsx == null && sanpham == null){
				return true;
			}
			if(lenhsx != null && lenhsx.length < 4){
				return true;
			}
			if(sanpham != null &&  sanpham.length < 4){
				return true;
			}
			return false;
		},
		isBtnLapPhieuMoi_disable:function (get) {
			var porder = get('porder');
			if(porder == null){
				return true;
			}
			return false;
		},
		isBtnTimKiem_disable:function (get) {
			var porder = get('porder');
			if(porder == null){
				return true;
			}
			return false;
		},
		isBtnTonKho_disable:function (get) {
			var maNPL_id = get('maNPL_id');
			if(maNPL_id == null){
				return true;
			}
			return false;
		},
    }
})