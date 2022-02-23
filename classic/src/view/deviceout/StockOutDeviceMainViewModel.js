Ext.define('GSmartApp.view.deviceout.StockOutDeviceMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockOutDeviceMainViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.deviceout.DeviceOutTypeStore',
        'GSmartApp.store.deviceout.DeviceOutStore',
        'GSmartApp.store.deviceout.DeviceOut_D_Store',
        'GSmartApp.store.UserListStore',
        'GSmartApp.store.deviceout.DeviceOutStatusStore'
    ],
    stores: {
        // main
        OrgToStore:{
			type :'ListOrgStore'
        },
        DeviceOutTypeStore:{
			type :'DeviceOutTypeStore'
        },
        DeviceOutStore:{
			type :'DeviceOutStore'
        },
        DeviceOut_D_Store:{
			type :'DeviceOut_D_Store'
        },
        DeviceOutStatusStore:{
			type :'DeviceOutStatusStore'
        },
        // detail
		UserStore: {
            type: 'userliststore'
		},
		OrgFromStore: {
            type: 'ListOrgStore'
		},
	},
	data: {
        deviceout: {
			// stockoutd: [],
			id: null
		},
	},
	// formulas: {
    //     // We'll explain formulas in more detail soon.
    //     stockoutd: function (get) {
	// 		return get('stockout').get('stockoutd');
    //     }
    // }
});
