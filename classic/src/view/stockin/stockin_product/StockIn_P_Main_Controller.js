Ext.define('GSmartApp.view.stockin.StockIn_P_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_Main_Controller',
    init: function () {

    },
    control: {
        '#stockin_p_main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) { console.log(newCard);
        var me = this;
        if (newCard.xtype == "StockIn_P_List_Main") {
            me.fireEvent('Reload_StockIn_P_List');
        }
        if (newCard.xtype == "StockIn_P_Order_List_Main") {
            me.fireEvent('Reload_StockIn_P_Order_List');
        }
    },
});
