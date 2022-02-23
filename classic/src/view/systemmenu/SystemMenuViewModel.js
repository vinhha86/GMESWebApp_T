Ext.define('GSmartApp.view.systemmenu.SystemMenuViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SystemMenuViewModel',
    requires: ['GSmartApp.store.groupuser.GroupUser_Menu_TreeStore'],
    stores: {
        MenuStore: {
            type: 'GroupUser_Menu_TreeStore'
        }
    },
    data: {
        roleid_link: 0,
        menuid_link: ''
    }
})