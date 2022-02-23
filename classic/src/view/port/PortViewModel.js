Ext.define('GSmartApp.view.Port.PortViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PortViewModel',
    requires: ['GSmartApp.store.PortStore','GSmartApp.store.org.ListOrgStore'],
    stores: {
        PortStore: {
            type: 'portstore'
        },
        ShipModeStore: {
            type: 'ShipModeStore'
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
                return 'Thêm mới cảng'
            }
            else {
                return 'Thông tin cảng ' + this.get('name');
            }
        }
    }
})