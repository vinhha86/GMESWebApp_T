Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Main_Controller',
    init: function () {

    },
    control: {
        '#Stockin_M_Main': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        console.log(newCard.xtype);
        if (newCard.xtype == "Stockin_M_List_Main") {
            me.fireEvent('Reload_StockinList');
        }
        else {
            if (newCard.xtype == "Stockin_Order_List_Main") {
                me.fireEvent('Reload_StockinOrderList');
            }
        }
    },
});
