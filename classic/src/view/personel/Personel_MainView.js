Ext.define('GSmartApp.view.personel.Personel_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Personel_MainView',
    id: 'Personel_MainView',
    viewModel: {
        type: 'Personel_MainView_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 220,
        title: 'Danh sách đơn vị',
        xtype: 'Personnel_ListOrg_View',
        border: true,
        margin: 1

    }, {
        region: 'center',
        title: 'Danh sách nhân viên',
        xtype: 'Personnel_ListView',
        border: true,
        margin: 1
    }]

})