Ext.define('GSmartApp.view.users.UserDetail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.UserDetail_ViewModel',
    requires: ['GSmartApp.store.org.OrgTreeStore','GSmartApp.store.org.ListOrgStore',
            'GSmartApp.store.user.StatusUserStore', 'GSmartApp.store.groupuser.GroupUserStore',
            'GSmartApp.store.groupuser.GroupUser_Menu_TreeStore', 'GSmartApp.store.groupuser.GroupUser_Function_Store'],
	data: {
        User: {
            personnel_code:''
        },
        roleid_link: 0,
        menuid_link: '',
        userid_link: null,

    },
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        OrgGrantStore : {
            type: 'ListOrgStore'
        },
        StatusUserStore: {
            type: 'StatusUserStore'
        },
        GroupUserStore: {
            type: 'GroupUserStore'
        },
        MenuStore: {
            type: 'GroupUser_Menu_TreeStore'
        },
        FunctionStore: {
            type: 'GroupUser_Function_Store'
        },
        GpayUserFactory: {
            type: 'GpayUserOrg'
        },
        GpayUserVendor: {
            type: 'GpayUserOrg'
        },
        GpayUserBuyer: {
            type: 'GpayUserOrg'
        }
    },
    formulas: {
        isReadOnly: function (get) {
            if (get('User.id') == 0 || get('User.id') == null) {
                return false
            }
            else {
                return true;
            }
        }
    }
})