Ext.define('GSmartApp.view.stockin.Stockin_P_Edit_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Stockin_P_Edit_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
		'GSmartApp.store.SkuStore', 'GSmartApp.store.stockin.Stockin_d_Store',
		'GSmartApp.store.stockin.StockinTypeStore',
		'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore',
		'GSmartApp.store.stockin.StockinStatusStore', 'GSmartApp.store.stockin.StockinStore',
		'GSmartApp.store.porder.POrder_ListStore', 'GSmartApp.store.stockin.StockinGroupStore',
	],
	stores: {
		DeviceInvStore: {
			type: 'DeviceInvStore'
		},
		SkuStore: {
			type: 'skustore'
		},
		StockinD_Store: {
			type: 'Stockin_d_Store'
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
		StatusStore: {
			type: 'stockinstatusstore'
		},
		POrder_ListStore: {
			type: 'POrder_ListStore'
		},
		POrder_ListGrantStore: {
			type: 'POrder_ListGrantStore'
		},
		GpayUser: {
			type: 'GpayUserOrg'
		},
		StockinGroupStore: {
			type: 'StockinGroupStore'
		},
		Sku_AutoComplete: {
			type: 'Sku_AutoComplete'
		},
	},
	data: {
		urlback: '',
		IsformMaster: false,
		isTabEpc: true,
		isNhapMoi: true,
		clsbtn: 'red-button',
		clsbtnStart: 'blue-button',
		clsbtnStop: 'red-button',
		clsbtnSkuError: '',
		isStart: false,
		stockin: {
			stockin_d: [],
			id: null
		},
		listepc: new Map(),
		deviceid: 0,
		curencycode: '',
		ordercode: "",
		groupstockin: 1,
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
		deviceid_link: 0,
		device: null,
		////////////////////////////////
		productSearchString: null,
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
		iseditSL: function (get) {
			if (get('stockin.status') >= 1) {
				return false;
			}
			if (get('groupstockin') == 1) return true;
			return false;
		},
		iseditSL_YC: function (get) {
			//Neu la nhap theo PO thi ko cho sua SL YC
			if (get('stockin.stockintypeid_link') == null) {
				return false;
			}
			if (get('stockin.stockintypeid_link') == 21) {
				// if (get('stockin.id') == null || get('stockin.id') == 0) {
				// 	return true;
				// }
				// return false;
				if (get('stockin.status') >= 1) {
					return false;
				}
				return true;
			}
			if (get('stockin.stockintypeid_link') == 22) {
				// if (get('stockin.id') == null || get('stockin.id') == 0) {
				// 	return true;
				// }
				// return false;
				if (get('stockin.status') >= 1) {
					return false;
				}
				return true;
			}
			
			return true;
		},
		isPOLineHidden: function (get) {
			if(get('stockin.stockintypeid_link') == null){
				return false;
			}
			if (get('stockin.stockintypeid_link') == 21)
				return false;
			else
				return true;
		},
		isStockoutHidden: function (get) {
			if(get('stockin.stockintypeid_link') == null){
				return true;
			}
			if (get('stockin.stockintypeid_link') == 22){
				return false;
			}
			else {
				return true;
			}
		},
		isBtnConfirmHidden: function (get) {
			var stockin = get('stockin');
			if(stockin.id == null || stockin.id == 0){
				return true;
			}
			if (stockin.status < 1 && stockin.status > -1) {
                return false;
            }
			return true;
		},
		isBtnLuuHidden: function (get) {
			if (get('stockin.status') > 0) {
				return true
			}
			else {
				return false;
			}
		},
		isBtnTestHidden: function(get){
			return true;
		},
		isBtnDuyetHidden: function(get){
			var stockin = get('stockin');
			if(stockin.id == null || stockin.id == 0){
				return true;
			}
			return false;
		},
	}
})