Ext.define('GSmartApp.view.RFID.demoRFID.stock.StockViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockViewController',
    init: function () {

    },
    control: {
        'StockView': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();

    }
})