Ext.define('GSmartApp.view.users.UserListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.UserListViewModel',
    requires: ['GSmartApp.store.UserListStore', 'GSmartApp.store.groupuser.GroupUserStore',
            'GSmartApp.store.user.StatusUserStore'],
    stores: {
        UserStore: {
            type: 'userliststore'
        },
        GroupUserStore: {
            type: 'GroupUserStore'
        },
        StatusUserStore: {
            type: 'StatusUserStore'
        }
    },
	data: {
        type: 1,
		urlback:''
    },
})