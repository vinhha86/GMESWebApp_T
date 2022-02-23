Ext.define('GSmartApp.view.personnelmapping.PersonnelMapping_MainView', {
    extend: 'Ext.container.Container',
    xtype: 'PersonnelMapping_MainView',
    id:'PersonnelMapping_MainView',
    reference: 'PersonnelMapping_MainView',
    controller: 'PersonnelMapping_MainViewController',
    viewModel: {
        type: 'PersonnelMapping_MainViewModel'
    },
    layout: 'border',
    items: [{
        region: 'west',
        border: true,
        width: '50%',
        title: 'Danh sách Not Map',
        xtype: 'PersonnelMapping_PersonnelNotMap',
        margin: 1
    },{
        region: 'center',
        border: true,
        width: '50%',
        title: 'Danh sách nhân viên chưa có mã đăng ký',
        xtype: 'PersonnelMapping_Personnel',
        margin: 1
    }] 
})