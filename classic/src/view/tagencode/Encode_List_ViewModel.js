Ext.define('GSmartApp.view.tagencode.Encode_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Encode_List_ViewModel',
	requires: ['GSmartApp.store.encode.warehouse_encode_store','GSmartApp.store.org.ListOrgStore'],
	stores:{
		EncodeStore: {
			type: 'warehouse_encode_store'
		},
		OrgStore: {
            type: 'ListOrgStore'
        },
        UserStore:{
            type: 'userliststore'
        }
	},
	data: {
		
	}
})