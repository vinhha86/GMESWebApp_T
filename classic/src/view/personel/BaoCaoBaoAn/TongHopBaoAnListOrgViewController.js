Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TongHopBaoAnListOrgViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        store.loadlistorg();
    },
    control: {
        '#TongHopBaoAnListOrgView': {
            itemclick: 'onloadDetail'
        },
        '#date_from': {
            collapse: 'loadData'
        },
        '#date_to': {
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
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('orgid_link');
        var date_from = viewmodel.get('date_from');
        var date_to = viewmodel.get('date_to');
        var store = viewmodel.getStore('BaoAnStore');
        var detail = grid.up('#TongHopBaoAnView');
        detail.setLoading('Đang tải dữ liệu');
        store.loadStore(orgid_link, date_from, date_to);
    }
})