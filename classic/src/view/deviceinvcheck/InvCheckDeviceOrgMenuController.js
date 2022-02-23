Ext.define('GSmartApp.view.deviceinvcheck.InvCheckDeviceOrgMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvCheckDeviceOrgMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#InvCheckDeviceOrgMenu': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        // console.log(record.data);
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('titleName', record.data.name);
        viewModel.set('parentid_link',record.data.parentid_link);
        //
        viewModel.set('fieldState', true);

        // load device list grid
        var device_store = viewModel.getStore('device_store'); //loadStoreByOrgGovern
        device_store.loadStoreByOrgGovern(record.data.id);
        var DeviceInvCheckStore = viewModel.getStore('DeviceInvCheckStore');
        DeviceInvCheckStore.loadStore(record.data.id);
        var DeviceInvCheckEPCStore = viewModel.getStore('DeviceInvCheckEPCStore');
        DeviceInvCheckEPCStore.removeAll();
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.loadStoreForInvCheckDevice();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        storeMenu.getFilters().add(this.activeOnlyFilter);
    },
    // onchkboxchange: function ( chkbox, newValue, oldValue, eOpts ) {
    //     // console.log(newValue);

    //     var me = this;
    //     var view = this.getView();
    //     if (!newValue) {
    //         view.getStore().getFilters().add(me.activeOnlyFilter);
    //     } else {
    //         view.getStore().getFilters().remove(me.activeOnlyFilter);
    //     }
    // }
})