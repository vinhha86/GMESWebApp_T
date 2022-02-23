Ext.define('GSmartApp.view.RFID.stock.StockView', {
    extend: 'Ext.tab.Panel',
    xtype: 'StockView',
    id: 'StockView',
    controller: 'StockViewController',
    items: [{
        title: '[3.1] Nhập kho',
        xtype: 'StockinView'
    },
    {
        title: '[3.2] Xuất kho',
        xtype: 'StockoutView'
    }
    ]
})