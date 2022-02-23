Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TongHopBaoAnViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.BaoCaoBaoAn.BaoAnStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        BaoAnStore: {
            type: 'BaoAnStore'
        }
    },
    data: {
        date_from: new Date(),
        date_to: new Date(),
        org_name: '',
        orgid_link: 0
    },
    formulas: {
        title_detail: function (data) {
            var name = 'Tổng hợp báo ăn lao động chính thức';
            name = data('org_name') == '' ? name : name + " đơn vị " + data('org_name');
            return name;
        }
    }
})