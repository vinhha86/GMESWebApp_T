Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_m_edit_pkl_detail.Stockin_M_Edit_Pkl_Detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_Edit_Pkl_Detail_ViewModel',
	requires: [

	],
	stores:{

	},
	data: {
        stockin: null,
        selectedDRecord: null,
        selectedPklRecord: null,
		objPkl: {
            id: null,
			lotnumberTxt: '',
			packageidTxt: '',
			yTxt: '',
			mTxt: '',
			mOriginTxt: '',
			yOriginTxt: '',
			sampleCheckTxt: '',
			colorTxt: null,
			grossweightTxt: '',
			grossweightCheckTxt: '',
			grossweightLbsTxt: '',
			grossweightLbsCheckTxt: '',
			widthYdsCheckTxt: '',
			widthYdsTxt: '',
			widthMetCheckTxt: '',
			widthMetTxt: '',
			pklRowTxt: null, // dãy
			pklSpaceTxt: null, // tầng
			pklFloorTxt: null, // khoang
		},
        slcankiem: '',
        dschuakiem: '',
        //
        isKiemcay_CheckEnable: true,
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		clsbtnSkuError:'',
		isStart:false,
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockin.id') == 0 || get('stockin.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		isBtnConfirmHidden: function (get) {
            if (get('stockin.status') == 1) {
                return true;
            }else if (get('stockin.status') == 0) {
                return false;
            }else {
                return true;
            }
        },
		isDoDaiFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1 || unitid_link == 3){
                return false;
            }
            return true;
        },
		isTrongLuongFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4 || unitid_link == 5){
                return false;
            }
            return true;
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1 || unitid_link == 4 || unitid_link == 5){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isKgColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4 || unitid_link == 1 || unitid_link == 3){
                return false;
            }
            return true;
        },
        isLbsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 5){
                return false;
            }
            return true;
        },

		isPklMetFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
		isPklYdsFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isPklKgFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4){
                return false;
            }
            return true;
        },
		isPklLbsFieldHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 5){
                return false;
            }
            return true;
        },
        isPklCmFieldHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return false;
            }else 
            if(width_unitid_link == 1){
                return false;
            }
            return true;
        },
		isPklInchFieldHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return true;
            }else 
            if(width_unitid_link == 3){
                return false;
            }
            return true;
        },
		isPklSelected: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return false;
			}
			return true;
		},
		isobjRecheckSelected: function(get){
			var objRecheck = get('objRecheck');
			if(objRecheck == null){
                return false;
			}
			return true;
		},
        isBtnDeletePklHidden: function(get){
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return true;
			}
			return false;
		},
        isIos: function(get){
			if(Ext.os.is.iOS){
				// console.log('ios');
				return true;
			}
			// console.log('not ios');
			return false;
		},
    },

	
})