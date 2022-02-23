Ext.define('GSmartApp.view.salary.User_OrgView_Add_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.User_OrgView_Add_Model',
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
    },
    data: {
        userid_link: null,
        orgtypeid_link: null,
        orgtypeid_link_list: null,
    }
})