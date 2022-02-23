Ext.define('GSmartApp.view.process_shipping.ProcessShippingMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessShippingMainViewController',
    init: function () {

    },
    control: {
        '#tabDetail': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this.getView();
        if (newCard.xtype == "Balance_D_POrder") {
            this.onCalBalance();
        }
        else if (newCard.xtype == 'SizeBreakdown_Grant_MainView') {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('POrder_ListGrantStore');
            var porderid_link = viewmodel.get('porderid_link');
            store.loadStore(porderid_link);
        }
        else if (newCard.xtype == 'POrderBom2View') {
            me.down('#POrderBom2View').getController().CreateColumns();
        }
    },
    onCalBalance: function () {
        var viewmodel = this.getViewModel();
        var SKUBalanceStore_Mat = viewmodel.getStore('SKUBalanceStore_Mat');

        var porderid_link = viewmodel.get('porderid_link');

        SKUBalanceStore_Mat.loadBalancePOrder(porderid_link);
    },
})