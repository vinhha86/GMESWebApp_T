Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_M_ViewModel',
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
		StockinD_Store:{
			type: 'Stockin_d_Store'
		},
		Stockin_Order_Store: {
			type: 'StockinStore'
		},
		Stockin_Order_D_Store:{
			type: 'Stockin_d_Store'
		},
		StockinProduct_Store:{
			type: 'Stockin_product_Store'
		},
		porderStore: {
			type: 'POrder_ListStore'
		},
        UnitStore: {
            type: 'UnitStore'
        },
		UnitWidthStore: {
            type: 'UnitStore'
        },
		GpayUserOrg: {
            type: 'GpayUserOrg'
        },
		StockinGroupStore: {
			type: 'StockinGroupStore'
		},
        SKUStore: {
            type: 'Sku_AutoComplete'
        },
	},
	data: {
		searchObj: {
			stockindate_from: new Date(),
			stockindate_to: new Date(),
			orgid_from_link: null,
			stockintypeid_link: null,
			pcontract: null, // string
			product: null, // string
		},

		urlback:'',
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
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		skucode: '',
		groupstockin: 1,
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
		//Chi dung cho View trong PContract
		pcontractid_link: null,
		stockinid_link: null,
		stockintypeid_link: 1,
		isAdd_Pcontract_Stockin: false, // true = pcontractView
		isNewStockin: false,
		isCanDoiNplPopup: false, // dùng cho 2 cột nhập kho và xuất kho trong tab cân đối NPL của tab tiến độ giao hàng
		mat_skuid_link: null, // dùng cho 2 cột nhập kho và xuất kho trong tab cân đối NPL của tab tiến độ giao hàng
		isRecordNguyenLieu: true,
		//ds trang thai, loai nhap combobox, filter list phieu nhap
		listStatusArray: [
			{'id': -1, 'text': 'Chưa kiểm tra'},
			{'id': 0, 'text': 'Đang kiểm tra'},
			{'id': 1, 'text': 'Đã duyệt'},
			// {'id': 2, 'text': 'Đã đồng bộ'},
			// {'id': -2, 'text': 'Đã xóa'},
		],
		statusComboValue: null,
		stockinTypeComboValue: null,
		orgFromFilterValue: null,
		orgToFilterValue: null,
		UsercreateFilterValue: null,
		productStringFilterValue: null,
		reasonFilterValue: null,
		//ds trang thai, loai nhap combobox, filter list yeu cau nhap
		stockinTypeComboValue_order: null,
		orgFromFilterValue_order: null,
		orgToFilterValue_order: null,
		UsercreateFilterValue_order: null,
		productStringFilterValue_order: null,
		reasonFilterValue_order: null,

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
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockin.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
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
            if(unitid_link == 4){
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
		isBtnLuuHidden: function (get){
			if(get('stockin.status') >=1 ){
				return true;
			}
			return false;
		},
		// isTypeMuaMoiNguyenPhuLieu: function (get){
		// 	if(get('stockin.stockintypeid_link') ==1){
		// 		return true;
		// 	}
		// 	return false;
		// },
		isTypeMuaMoiNguyenPhuLieu: function (get){
			if(get('stockin.stockintypeid_link') ==1){
				return 343;
			}
			return 375;
		},
		isBtnAddNoiGiaoHidden: function (get){
			if(get('stockin.stockintypeid_link') ==1){
				return false;
			}
			return true;
		},
		isStatusComboValueTriggerHidden: function (get){
			var statusComboValue = get('statusComboValue');
            if(statusComboValue == null || statusComboValue == ''){
                return true;
            }
            return false;
		},
		isRecordNguyenLieuMet: function (get){
			var isRecordNguyenLieu = get('isRecordNguyenLieu');
			if(!isRecordNguyenLieu) {
				return false;
			}

			var stockin = get('stockin');
			if(stockin != null){
				var unitid_link = stockin.unitid_link;
				if(unitid_link != null){
					if(unitid_link == 1){
						return true;
					}
					return false;
				}
				return false;
			}
            return false;
		},
		isRecordNguyenLieuYds: function (get){
			var isRecordNguyenLieu = get('isRecordNguyenLieu');
			if(!isRecordNguyenLieu) {
				return false;
			}

			var stockin = get('stockin');
			if(stockin != null){
				var unitid_link = stockin.unitid_link;
				if(unitid_link != null){
					if(unitid_link == 3){
						return true;
					}
					return false;
				}
				return false;
			}
            return false;
		},
		isRecordNguyenLieuKg: function (get){
			var isRecordNguyenLieu = get('isRecordNguyenLieu');
			if(!isRecordNguyenLieu) {
				return false;
			}

			var stockin = get('stockin');
			if(stockin != null){
				var unitid_link = stockin.unitid_link;
				if(unitid_link != null){
					if(unitid_link == 4){
						return true;
					}
					return false;
				}
				return false;
			}
            return false;
		},
		isRecordNguyenLieuLbs: function (get){
			var isRecordNguyenLieu = get('isRecordNguyenLieu');
			if(!isRecordNguyenLieu) {
				return false;
			}

			var stockin = get('stockin');
			if(stockin != null){
				var unitid_link = stockin.unitid_link;
				if(unitid_link != null){
					if(unitid_link == 5){
						return true;
					}
					return false;
				}
				return false;
			}
            return false;
		},
    }
})