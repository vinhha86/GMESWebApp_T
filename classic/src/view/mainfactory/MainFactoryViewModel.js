Ext.define('GSmartApp.view.mainfactory.MainFactoryViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MainFactoryViewModel',
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
                return 'Thêm mới trụ sở chính'
            }
            else {
                return 'Thông tin trụ sở chính ' + this.get('name');
            }
        }
    }
})