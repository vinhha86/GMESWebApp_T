Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceMain', {
    extend: 'Ext.form.Panel',
    xtype: 'InvCheckDeviceMain',
    id:'InvCheckDeviceMain',
    viewModel:{
        type:'InvCheckDeviceViewModel'
    },
    layout: 'border',
    border: false,
    items: [{
        region: 'west',
        width: '30%',
        title: 'Danh sách đơn vị',
        xtype: 'InvCheckDeviceOrgMenu',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        xtype: 'InvCheckDeviceTab',
        reference:'InvCheckDeviceTab',
        // xtype: 'InvCheckDeviceDetailList',
        // reference:'InvCheckDeviceDetailList',
        border: true,
        margin: 1
    }]

})