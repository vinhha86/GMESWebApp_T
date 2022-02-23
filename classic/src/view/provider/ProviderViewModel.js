Ext.define('GSmartApp.view.Provider.ProviderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProviderViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'orgstore'
        }
    },
    data: {
        id: 0,
        name: '',
        currentRec : null
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0) {
                return 'Thêm mới nhà cung cấp'
            }
            else {
                return 'Thông tin nhà cung cấp ' + this.get('name');
            }
        }
    }
})