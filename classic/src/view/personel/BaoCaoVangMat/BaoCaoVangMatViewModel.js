Ext.define('GSmartApp.view.personel.BaoCaoVangMatViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.BaoCaoVangMatViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.TimeSheetAbsence.TimeSheetAbsenceStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        TimeSheetAbsenceStore: {
            type: 'TimeSheetAbsenceStore'
        }
    },
    data: {
        date: new Date(),
        org_name: '',
        orgid_link: 0
    },
    formulas: {
        title_detail: function (data) {
            var name = 'Danh sách vắng ';
            name = data('org_name') == '' ? name : name + " đơn vị " + data('org_name');
            return name;
        }
    }
})