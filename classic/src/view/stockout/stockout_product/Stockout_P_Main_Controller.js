Ext.define('GSmartApp.view.stockout.Stockout_P_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Main_Controller',
    init: function () {

    },
    control: {
        '#stockout_p_main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) { console.log(newCard);
        var me = this;
        if (newCard.xtype == "Stockout_P_List_Main") {
            me.fireEvent('Reload_Stockout_P_List');
        }
        if (newCard.xtype == "Stockout_P_Order_List_Main") {
            me.fireEvent('Reload_Stockout_P_Order_List');
        }
    },
});
