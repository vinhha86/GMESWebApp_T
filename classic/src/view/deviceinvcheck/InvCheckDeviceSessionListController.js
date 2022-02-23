Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceSessionListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvCheckDeviceSessionListController',
    init: function () {
        var viewModel = this.getViewModel();
        var DeviceInvCheckStore = viewModel.getStore('DeviceInvCheckStore');
        DeviceInvCheckStore.sort('invcheckdatetime','DESC');
    },
    control: {
        '#InvCheckDeviceSessionList': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        
        var DeviceInvCheckEPCStore = viewModel.getStore('DeviceInvCheckEPCStore');
        // DeviceInvCheckEPCStore.loadStore(record.data.id);
        DeviceInvCheckEPCStore.setData(record.data.epcs);

        // DeviceInvCheckEPCStore
    },
})