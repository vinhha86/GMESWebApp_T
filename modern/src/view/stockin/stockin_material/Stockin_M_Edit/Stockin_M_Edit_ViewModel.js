Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_Edit_ViewModel',
	requires: [
		'GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore', 'GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.porder.POrder_ListStore', 'GSmartApp.store.stockin.StockinGroupStore',
		'GSmartApp.store.unit.UnitStore', 'GSmartApp.store.stockin.Stockin_product_Store',
		'GSmartApp.store.GpayUserOrg', 'GSmartApp.store.Sku_AutoComplete'
	],
	stores:{
		DeviceInvStore:{
			type :'DeviceInvStore'
		},
		OrgStore:{
			type: 'orgstore'
		},
		SkuStore:{
			type: 'skustore'
		},
		Stockin_d_Store:{
			type: 'Stockin_d_Store'
		},
		StockinLotStore: {
			type: 'StockinLotStore'
		},
		StockinPklStore: {
			type: 'StockinPklStore'
		},
		StockinPklRecheckStore: {
			type: 'StockinPklStore'
		},
		StockinTypeStore: {
			type: 'StockinTypeStore'
		},
		UserStore: {
            type: 'userliststore'
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
		porderStore: {
			type: 'POrder_ListStore'
		},
		attributeValueStore:{
			type :'attributeValueStore'
		},
		StockinProduct_Store:{
			type: 'Stockin_product_Store'
		},
	},
	data: {
		urlback:'',
		isKiemcay_CheckEnable: true,
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		clsbtnSkuError:'',
		isStart:false,
		stockin: {
			stockin_d: [],
			stockin_product: [],
			stockin_lot: [],
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		skucode: '',

		// Stockin_M_Edit_P
		stockinD: null,

		// Stockin_M_Edit_D
		selectedDRecord: null, // loại vải đang chọn
		lotNumberTxt: '',
		cayNumberTxt: '',
		yNumberTxt: '',
		canNumberTxt: '',

		// Stockin_M_Edit_Lot
		selectedLotRecord: null, // lot đang chọn
		lot_stockindId: null, // kiểm lot combobox value
		spaces: [],
		spacesString: '',
		lotRow: null, // dãy
		lotSpace: null, // hàng
		lotFloor: null, // tầng
		lotAmount: null, // sl cây
		maLotFilter: null,

		// Stockin_M_Edit_Pkl
		selectedPklRecord: null, // pkl đang chọn
		pkl_stockindId: null, // kiểm cây combobox value
		cbbox_lotnumber_value: null, // kiểm cây combobox lotnumber value
		maPklFilter: '', // filter field pkl

		// textfield
		objPkl: {
			lotnumberTxt: '',
			packageidTxt: '',
			yTxt: '',
			mTxt: '',
			mOriginTxt: '',
			yOriginTxt: '',
			sampleCheckTxt: '',
			colorTxt: null,
			// widthTxt: '',
			grossweightTxt: '',
			grossweightCheckTxt: '',
			grossweightLbsTxt: '',
			grossweightLbsCheckTxt: '',
			widthYdsCheckTxt: '',
			widthYdsTxt: '',
			widthMetCheckTxt: '',
			widthMetTxt: '',
			pklRowTxt: null, // dãy
			pklSpaceTxt: null, // hàng
			pklFloorTxt: null, //tầng
		},

		// Stockin_M_Edit_Pkl_Recheck
		selectedPklRecheckRecord: null, // pkl đang chọn
		// storePackinglistRecheckArr: [],
		// maPklRecheckFilterByMaVai: '',
		pklRecheck_stockindId: null, // kiểm 10% combobox value
		maPklRecheckFilter: '', // filter field pkl recheck 10%
		objRecheck: null, // obj chứa các trường thông tin

		// phong to, thu gon
		IsformMaster: true,
		// tooltip
		fieldTooltip: null,
		//
		isStockin_ValueSelect_window_open: false,


		// TEST
		testfieldValue: null,
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
            // if(unitid_link == null){
            //     return true;
            // }else 
            // if(unitid_link == 1 || unitid_link == 4 || unitid_link == 5){
			if(unitid_link == 1 || unitid_link == null){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            } 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
		isKgColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            } 
            // if(unitid_link == 4 || unitid_link == 1 || unitid_link == 3){
			if(unitid_link == 4){
                return false;
            }
            return true;
        },
        isLbsColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            } 
            if(unitid_link == 5){
                return false;
            }
            return true;
        },
		isCmColumnHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return false;
            } 
            if(width_unitid_link == 1){
                return false;
            }
            return true;
        },
        isInchColumnHidden: function (get) {
            var width_unitid_link = get('stockin.width_unitid_link');
            if(width_unitid_link == null){
                return true;
            } 
            if(width_unitid_link == 3){
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
		isPklSelected: function (get) {
			var selectedPklRecord = get('selectedPklRecord');
			if(selectedPklRecord == null){
                return false;
			}
			return true
		},
		isobjRecheckSelected: function(get){
			var objRecheck = get('objRecheck');
			if(objRecheck == null){
                return false;
			}
			return true
		},
		isIos: function(get){
			if(Ext.os.is.iOS){
				// console.log('ios');
				return true;
			}
			// console.log('not ios');
			return false;
		},


		// TEST
		testfieldXtype: function(get){
			if (Ext.os.is.iOS) {
				return 'textfield';
			}
			if (Ext.os.is.Android) {
				return 'numberfield';
			}
			return 'numberfield';
		}
    },

	
})