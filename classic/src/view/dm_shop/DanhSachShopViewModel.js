Ext.define('GSmartApp.view.dm_shop.DanhSachShopViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DanhSachShopViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'orgstore'
        }
    },
})