Ext.define('GSmartApp.view.qcorg.QCOrgViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.QCOrgViewModel',
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
                return 'Thêm mới đơn vị QC'
            }
            else {
                return 'Thông tin đơn vị QC ' + this.get('name');
            }
        }
    }
})