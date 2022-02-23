Ext.define('GSmartApp.view.devicein.StockInDeviceMain', {
    extend: 'Ext.container.Container',
    xtype: 'StockInDeviceMain',
    id:'StockInDeviceMain',
    controller: 'StockInDeviceMainController', 
    viewModel: {
        type: 'StockInDeviceMainViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'StockinDevice_List'
    }],
    listeners: {
        activate: 'onActivate'
    }        
})