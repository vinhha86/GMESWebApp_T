Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnView', {
    extend: 'Ext.form.Panel',
    xtype: 'TongHopBaoAnView',
    id: 'TongHopBaoAnView',
    viewModel: {
        type: 'TongHopBaoAnViewModel'
    },
    controller: 'TongHopBaoAnViewController',
    layout: 'border',
    items: [{
        region: 'west',
        width: 250,
        title: 'Danh sách đơn vị',
        xtype: 'TongHopBaoAnListOrgView',
        border: true,
        margin: 1

    }, {
        region: 'center',
        xtype: 'ChiTietBaoAnView',
        border: true,
        margin: 1
    }]
})