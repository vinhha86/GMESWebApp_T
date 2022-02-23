Ext.define('GSmartApp.view.Schedule.Plan.Schedule_Plan_Porder_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_Plan_Porder_MainViewController',
    init: function () {


    },
    control: {
        'Schedule_Plan_Porder_MainView': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        if (newCard.xtype == "ProcessShippingMainView") {
            
        }
    }
})