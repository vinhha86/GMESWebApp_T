Ext.define('GSmartApp.view.stockout.Stockout_M_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_Main_Controller',
    init: function () {

    },
    control: {
        '#Stockout_M_Main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        console.log(newCard.xtype);
        if (newCard.xtype == "Stockout_M_List_Main") {
            me.fireEvent('Reload_StockoutList');
        }
        else {
            if (newCard.xtype == "Stockout_Order_Main") {
                me.fireEvent('onReload_StockoutOrderList');
            }
        }
    },
});
