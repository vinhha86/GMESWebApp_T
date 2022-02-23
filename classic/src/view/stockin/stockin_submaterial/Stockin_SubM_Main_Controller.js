Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_SubM_Main_Controller',
    init: function () {

    },
    control: {
        '#stockin_subm': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        //  console.log(newCard);
        var me = this;
        if (newCard.xtype == "Stockin_SubM_List_Main") {
            me.fireEvent('Reload_Stockin_SubM_List');
        }
        if (newCard.xtype == "Stockin_SubM_Order_List_Main") {
            me.fireEvent('Reload_Stockin_SubM_Order_List');
        }
    },
});
