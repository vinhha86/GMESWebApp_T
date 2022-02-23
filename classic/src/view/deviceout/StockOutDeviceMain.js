Ext.define('GSmartApp.view.deviceout.StockOutDeviceMain', {
    extend: 'Ext.container.Container',
    xtype: 'StockOutDeviceMain',
    controller: 'StockOutDeviceMainController',
    viewModel: {
        type: 'StockOutDeviceMainViewModel'
    },
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'StockOutDevice_List',
            margin: 1,
            region: 'center'
        },
        // {
        //     xtype: 'stockouttocutorderwaiting',
        //     id: 'panel_orderwaiting',
        //     width: 260,
        //     region: 'east',
        //     hidden: true  
        // }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
