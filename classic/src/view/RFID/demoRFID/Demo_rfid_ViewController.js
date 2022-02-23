Ext.define('GSmartApp.view.RFID.demoRFID.Demo_rfid_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Demo_rfid_ViewController',
    init: function () {

    },
    control: {
        'Demo_rfid_View': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        if (newCard.xtype == 'inv_main_View') {
            var storeInv = viewmodel.getStore('inv_store');
            storeInv.loadStore();
        }
        else if (newCard.xtype == 'encode_View') {
            var storeIntType = viewmodel.getStore('StoreType');
            storeIntType.loadStore();
        }
    }
})