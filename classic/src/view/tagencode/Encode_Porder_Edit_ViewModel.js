Ext.define('GSmartApp.view.tagencode.Encode_Porder_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Encode_Porder_Edit_ViewModel',
	stores:{
        DeviceEncodeStore: {
			type: 'devicestore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        UserStore:{
            type: 'userliststore'
        },
		Porder_SKU_Store: {
			type: 'porderSKUStore'
        },
        Encode_epc_Store: {
            type: 'porder_encode_epc_store'
        }
	},
	data: {
		encode: {
            encode_date: '',
            id: null,
            encode_amount: 0,
            porderid_link: 0
        },
        skucode: '',
        color_name: '',
        size_name: '',
        porderyear: 0,

        clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		clsbtnSkuError:'',
        isStart:false,
        isEdit: false
    },
    formulas: {
        title: function (get) {
            if (get('skucode') == '') {
                return 'Thông tin phiên mã hóa'
            }
            else {
                return 'Mã vạch: "'+get('skucode') + '" - Màu: "'+ get('color_name') + '" - Cỡ: "' + get('size_name')+ '"';
            }
        }
    }
})