Ext.define('GSmartApp.view.factory.FactoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.FactoryViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
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
                return 'Thêm mới đơn vị'
            }
            else {
                return 'Thông tin đơn vị ' + this.get('name');
            }
        }
    }
})