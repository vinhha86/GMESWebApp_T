Ext.define('GSmartApp.view.devicein.StockInDeviceMainViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.StockInDeviceMainViewModel',
	requires: [
		'GSmartApp.store.org.ListOrgStore',
		'GSmartApp.store.devicein.DeviceInTypeStore',
		'GSmartApp.store.devicein.DeviceInStore',
		'GSmartApp.store.devicein.Devicein_D_Store',
		'GSmartApp.store.UserListStore',
    ],
	stores:{
		// main
		OrgFromStore: {
            type: 'ListOrgStore'
		},
		DeviceInTypeStore: {
            type: 'DeviceInTypeStore'
		},
		DeviceInStore: {
            type: 'DeviceInStore'
		},
		Devicein_D_Store: {
            type: 'Devicein_D_Store'
		},
		// detail
		UserStore: {
            type: 'userliststore'
		},
		OrgToStore: {
            type: 'ListOrgStore'
		},

	},
	data: {
		devicein: {
			devicein_d: [],
			id: null
		}
	},
	// formulas: {
    //     isEdit: function (get) {
    //         if (get('devicein.id') == 0 || get('devicein.id') == null) {
    //             return false
    //         }
    //         else {
    //             return true;
    //         }
    //     }
    // }
})