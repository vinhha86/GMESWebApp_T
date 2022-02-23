Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChitietTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChitietTabViewController',
    init: function () {
    },
    control: {

    },
    listen: {
        controller: {
            'TimeSheetLunch_ListOrgViewController': {
                'SelectOrg': 'onSelectOrg'
            }
        }
    },
    onSelectOrg: function (record) {
        var viewmodel = this.getViewModel();
        viewmodel.set('orgid_link', record.get('id'));
        if (record.get('orgtypeid_link') == 13) {
            viewmodel.set('isHidden_khach', false);
            var storeKhach = viewmodel.getStore('TimeSheetLunchKhachStore');
            var orgid_link = viewmodel.get('orgid_link');
            var date = viewmodel.get('current');
            storeKhach.loadStore(orgid_link, date);
        }
        else
            viewmodel.set('isHidden_khach', true);

    }
})