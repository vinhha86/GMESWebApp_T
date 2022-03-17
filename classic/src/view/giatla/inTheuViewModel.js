Ext.define('GSmartApp.view.giatla.giatLaViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.giatLaViewModel',
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
        currentRec : null,
        oldName: null,
        newName: null,
        oldCode: null,
        newCode: null
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0) {
                return 'Thêm mới giặt là'
            }
            else {
                return 'Thông tin giặt là ' + this.get('name');
            }
        }
    }
})