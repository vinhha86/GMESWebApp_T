Ext.define('GSmartApp.view.Customer.CustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CustomerViewModel',
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
                return 'Thêm mới khách hàng'
            }
            else {
                return 'Thông tin khách hàng ' + this.get('name');
            }
        }
    }
})