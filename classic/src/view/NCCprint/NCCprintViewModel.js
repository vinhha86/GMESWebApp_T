Ext.define('GSmartApp.view.NCCprint.NCCprintViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.NCCprintViewModel',
    requires: ['GSmartApp.store.OrgStore','GSmartApp.store.ColorStore'],
    stores: {
        OrgStore: {
            type: 'orgstore'
        },
        ColorStore: {
            type: 'ColorStore'
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
                return 'Thêm mới vendor'
            }
            else {
                return 'Thông tin vendor ' + this.get('name');
            }
        }
    }
})