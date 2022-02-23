Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.InvCheckDeviceViewModel',
    requires: [
        'GSmartApp.store.org.ListOrgMenuTreeStore',
        'GSmartApp.store.device.device_store',
        'GSmartApp.store.deviceinvcheck.DeviceInvCheckStore',
        'GSmartApp.store.deviceinvcheck.DeviceInvCheckEPCStore'
    ],
    stores: {
        MenuStore: {
            type: 'ListOrgMenuTreeStore'
        },
        device_store: {
            type: 'device_store'
        },
        DeviceInvCheckStore: {
            type: 'DeviceInvCheckStore'
        },
        DeviceInvCheckEPCStore: {
            type: 'DeviceInvCheckEPCStore'
        },
    },
    data: {
        id: 0,
    },
})