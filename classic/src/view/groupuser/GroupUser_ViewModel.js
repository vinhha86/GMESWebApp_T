Ext.define('GSmartApp.view.groupuser.GroupUser_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.GroupUser_ViewModel',
    requires: ['GSmartApp.store.groupuser.GroupUserStore', 'GSmartApp.store.groupuser.GroupUser_Menu_TreeStore',
            'GSmartApp.store.groupuser.GroupUser_Function_Store'],
    stores: {
        GroupUserStore: {
            type: 'GroupUserStore'
        },
        MenuStore: {
            type: 'GroupUser_Menu_TreeStore'
        },
        FunctionStore: {
            type: 'GroupUser_Function_Store'
        }
    },
    data: {
        roleid_link: 0,
        menuid_link: ''
    }
})