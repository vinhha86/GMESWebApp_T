Ext.define('GSmartApp.view.tagencode.Encode_EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Encode_EditModel',
    requires: ['GSmartApp.store.DeviceStore', 'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.store.encode.warehouse_encode_d_store',
        'GSmartApp.store.encode.warehouse_encode_epc_store',
        'GSmartApp.store.UserListStore'],
    stores:{
        DeviceEncodeStore: {
			type: 'device_store'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        UserStore:{
            type: 'userliststore'
        },
        Encode_store: {
            type: 'warehouse_encode_store'
        },
        Encode_epc_Store:{
            type: 'warehouse_encode_epc_store'
        },
        Encode_sku_Store:{
            type: 'warehouse_encode_d_store'
        }
    },
    data: {
        type: 1,
		urlback:'',
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		isStart:false,
        tagnumber:0,
        warehouse_encode: {
            id: null,
            totalencode: 0,
            timecreate: new Date(),
            warehouse_encode_d: []
        }
    },
    formulas: {
        isApprove: function (get) {
            if (get('warehouse_encode.status') == 0) {
                return false
            }
            else {
                return true;
            }
        }
    }
});
