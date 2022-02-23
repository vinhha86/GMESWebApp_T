Ext.define('GSmartApp.view.personel.BaoCaoVangMat.BaoCaoVangMatView', {
    extend: 'Ext.form.Panel',
    xtype: 'BaoCaoVangMatView',
    viewModel: {
        type: 'BaoCaoVangMatViewModel'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 220,
        title: 'Danh sách đơn vị',
        xtype: 'BaoCaoVangMat_listOrgView',
        border: true,
        margin: 1

    }, {
        region: 'center',
        xtype: 'BaoCaoVangMat_DetailView',
        border: true,
        margin: 1
    }]

})