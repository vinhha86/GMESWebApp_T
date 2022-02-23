Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceTab', {
    extend: 'Ext.form.Panel',
    xtype: 'InvCheckDeviceTab',
    id: 'InvCheckDeviceTab',
    // controller: 'InvCheckDeviceTabController',
    // viewModel: {
    //     type: 'PContractViewModel'
    // },
    layout: 'border',
    border: false,
    items: [
    {
        region: 'center',
        border: false,
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [{
            title: 'Danh sách thiết bị',
            xtype: 'InvCheckDeviceDetailList',
            reference:'InvCheckDeviceDetailList',
        },{
            title: 'Danh sách phiên kiểm kê',
            layout: 'border',
            border: false,
            items: [{
                region: 'north',
                xtype: 'InvCheckDeviceSessionList',
                height: '50%',
                border: true,
            },
            {
                region: 'center',
                xtype: 'InvCheckDeviceEPCList',
                height: '50%',
                border: true,
            }]
        }]
    }]
})