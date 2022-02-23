Ext.define('GSmartApp.view.stockout.Stockout_M_EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_M_EditModel',
    requires: ['GSmartApp.store.DeviceInvStore', 'GSmartApp.store.OrgStore',
	'GSmartApp.store.SkuStore','GSmartApp.store.stockout.Stockout_d',
	'GSmartApp.store.stockout.StockoutTypeStore',
	'GSmartApp.store.UserListStore', 'GSmartApp.store.org.ListOrgStore',
	'GSmartApp.store.VatTypeStore', 'GSmartApp.store.CurrencyStore',
	'GSmartApp.store.Stockout', 'GSmartApp.store.stockout_order.Stockout_order_Store',
    'GSmartApp.store.Product_AutoComplete'],
    stores: {
        DeviceInvStore:{
			type :'DeviceInvStore'
        },
        OrgStore:{
			type: 'orgstore'
		},
		SkuStore:{
			type: 'skustore'
		},
		StockoutD_Store:{
			type: 'Stockout_d'
		},
		StockoutTypeStore: {
			type: 'StockoutTypeStore'
		},
		Stockout: {
			type: 'stockout'
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
        StockinGroupStore: {
			type: 'StockinGroupStore'
		},
        UnitStore: {
            type: 'UnitStore'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
        SKUStore: {
            type: 'Sku_AutoComplete'
        },
		Product_AutoComplete: {
			type :'Product_AutoComplete'
		},
	},
	data: {
        sourceView: null, 
        searchObj: {
			stockoutdate_from: new Date(),
			stockoutdate_to: new Date(),
			stockouttypeid_link: null,
			product: null, // string
            maNpl: null, // string
            lotnumber: null, // string
		},

        stockout: {
			stockoutd: [],
			id: null,
            productid_link: null,
            pcontract_productid_link: null,
            product_buyercode: null,
            approver_userid_link: null,
            unapprover_userid_link: null
		},
		listepc: new Map(),
        isStart:false,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
        clsbtnSkuError:'',        
        IsformMaster: false,
        groupstockin: 1,
		isHidden: false,
        isRFIDHidden: true,
		isBarcodeHidden: true,
		isManualHidden: false,

        //ds trang thai, loai nhap combobox, filter list phieu nhap
		listStatusArray: [
            {'id': -2, 'text': 'Chưa nhặt hàng'},
			{'id': -1, 'text': 'Đang nhặt hàng'},
			{'id': 0, 'text': 'Đang kiểm tra'},
			{'id': 1, 'text': 'Đã duyệt'},
            {'id': 2, 'text': 'Đã nhận hàng'},
		],
		statusComboValue: null,
		stockoutTypeComboValue: null,
		orgFromFilterValue: null,
		orgToFilterValue: null,
        productBuyerCodeFilterValue: null,
		UsercreateFilterValue: null,
        stockoutorderid_link: null
	},
	formulas: {
        isEdit: function (get) {
            if (get('stockout.id') == 0 || get('stockout.id') == null) {
                return false
            }
            else {
                return true;
            }
        },
		isBtnConfirmHidden: function (get) {
            if(get('stockout.id') == 0 || get('stockout.id') == null){
                return true;
            }
            if (get('stockout.status') == 1) {
                return true;
            }else if (get('stockout.status') == 0) {
                return false;
            }else if (get('stockout.status') == 2) {
                return true;
            }else {
                return true;
            }
        },
        isBtnUnConfirmHidden: function (get) {
            if(get('stockout.id') == 0 || get('stockout.id') == null){
                return true;
            }
            if (get('stockout.status') == 1) {
                return false;
            }else if (get('stockout.status') == 0) {
                return true;
            }else if (get('stockout.status') == 2) {
                return true;
            }else {
                return true;
            }
        },
        isBtnSaveHidden: function (get) {
            if(get('stockout.status') >=1){
                return true;
            }
            return false;
        },
		isMetColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 1){
                return false;
            }
            return true;
        },
        isYdsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 3){
                return false;
            }
            return true;
        },
        isKgColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 4){
                return false;
            }
            return true;
        },
		isLbsColumnHidden: function (get) {
            var unitid_link = get('stockout.unitid_link');
            if(unitid_link == null){
                return true;
            }else 
            if(unitid_link == 5){
                return false;
            }
            return true;
        },
    }
});
