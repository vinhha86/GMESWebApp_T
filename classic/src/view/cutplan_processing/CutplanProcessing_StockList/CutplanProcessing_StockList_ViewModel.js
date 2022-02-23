Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_StockList_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.CutplanProcessing_StockList_ViewModel',
    requires: [
        
    ],
    stores: {
        WarehouseStore: {
            type: 'WarehouseStore'
        },
    },
    data: {
        skuid_link: null,
    }
})