Ext.define('GSmartApp.view.stockin.HandoverPackToStock_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.HandoverPackToStock_ViewModel',
	requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockin.Stockin_d_Store',
	'GSmartApp.store.stockin.StockinTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore', 
	'GSmartApp.store.stockin.StockinStatusStore', 'GSmartApp.store.stockin.StockinStore',
	'GSmartApp.store.porder.POrder_ListStore','GSmartApp.store.stockin.StockinGroupStore'],
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
		StockinD_Store:{
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
		VatTypeStore:{
			type : 'VatTypeStore'
		},
		CurrencyStore: {
			type : 'CurrencyStore'
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
		GpayUser: {
			type: 'GpayUserOrg'
		},
	},
	data: {
		urlback:'',
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'red-button',
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
		groupstockin: 1,
		isHidden: false,
		isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,
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
		iseditSL: function(get){
			if(get('groupstockin') == 1) return true;
			return false;
		},
		iseditSL_YC: function(get){
			//Neu la nhap theo PO thi ko cho sua SL YC
			if(get('stockin.stockintypeid_link') == 21) 
				return false;
			else
				return true;
		},
		isPOLineHidden: function(get){
			if(get('stockin.stockintypeid_link') == 21) 
				return false;
			else
				return true;
		},
		isStockoutHidden: function(get){
			if(get('stockin.stockintypeid_link') == 22) 
				return false;
			else
				return true;
		},
		isBtnConfirmHidden: function (get) {
            if (get('stockin.status') < 1) {
                return false
            }
            else {
                return true;
            }
        },
    }
})