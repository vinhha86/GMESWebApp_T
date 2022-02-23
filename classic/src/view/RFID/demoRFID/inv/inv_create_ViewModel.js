Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_create_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inv_create_ViewModel',
    requires: ['GSmartApp.store.demo.StoreType'],
    stores: {
        StoreType: {
            type: 'StoreType'
        }
    },
    data: {
        inv: {

        }
    }
});
