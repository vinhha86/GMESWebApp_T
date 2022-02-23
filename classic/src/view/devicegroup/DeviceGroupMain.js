Ext.define('GSmartApp.view.devicegroup.DeviceGroupMain', {
    extend: 'Ext.form.Panel',
    xtype: 'DeviceGroupMain',
    id:'DeviceGroupMain',
    viewModel:{
        type:'DeviceGroupViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'west',
        width: '50%',
        title: 'Danh sách nhóm thiết bị',
        xtype: 'DeviceGroupMenu',
        border: true,
        margin: 1
    
    }, {
        region: 'east',
        width: '50%',
        title: 'Thông tin chi tiết',
        xtype: 'DeviceGroupDetail',
        reference:'DeviceGroupDetail',
        border: true,
        margin: 1
    }]

})