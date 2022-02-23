Ext.define('GSmartApp.view.personel.BaoCaoVangMat.BaoCaoVangMat_listOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoVangMat_listOrgViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        store.loadlistorg();
    },
    control: {
        '#BaoCaoVangMat_listOrgView': {
            itemclick: 'onloadDetail'
        },
        '#date': {
            collapse: 'loadData'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('orgid_link', record.data.id);
        viewModel.set('org_name', record.get('name'));
        this.loadData();
    },
    loadData: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('TimeSheetAbsenceStore');
        var orgid_link = viewmodel.get('orgid_link');
        var s_date = me.down('#date').getRawValue();
        var lst = s_date.split('/');

        var date = new Date(lst[2], lst[1] - 1, lst[0], 0, 0, 0);
        store.loadByOrgAndDate(date, orgid_link);
    }
})