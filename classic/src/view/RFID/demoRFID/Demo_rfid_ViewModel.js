Ext.define('GSmartApp.view.RFID.demoRFID.inv.Demo_rfid_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Demo_rfid_ViewModel',
    requires: ['GSmartApp.store.demo.inv_store', 'GSmartApp.store.demo.inv_detail_store',
        'GSmartApp.store.demo.StoreType', 'GSmartApp.store.demo.Stockin_demo_Store', 'GSmartApp.store.demo.device_demo_store'],
    stores: {
        inv_store: {
            type: 'inv_store'
        },
        inv_detail_store: {
            type: 'inv_detail_store'
        },
        //2
        StoreType: {
            type: 'StoreType'
        },
        StockinStore: {
            type: 'Stockin_demo_Store'
        },
        StockoutStore: {
            type: 'Stockin_demo_Store'
        },
        device_store: {
            type: 'device_demo_store'
        }
    },
    data: {
        encode: {
            qty: 1,
            name: '',
            code: '',
            lot: '',
            exp: ''
        },
        type: {
            en_name: false,
            en_code: false,
            en_lot: false,
            en_exp: false,
            en_qty: false,
            id: 0
        },
        isStart: false,
        deviceid: 0,
        id_invstore: 0
    }
});
