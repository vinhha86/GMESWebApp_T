Ext.define('GSmartApp.view.tagencode.Encode_Porder_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Encode_Porder_List_ViewModel',
    requires: ['GSmartApp.store.encode.porder_encode_store','GSmartApp.store.org.ListOrgStore'],
    stores:{
        Porder_Encode_Store:{
            type: 'porder_encode_store'
        },
        UserStore: {
            type: 'userliststore'
        }
    }
});
