Ext.define('GSmartApp.view.stock.stockmenuwindow.StockMenuWindow_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockMenuWindow_ViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockTreeStore',
    ],
    stores: {
        StockTreeStore: {
            type: 'StockTreeStore'
        },
    },
    data: {
        selectedNode: null,
    },
    formulas: {

    }
})