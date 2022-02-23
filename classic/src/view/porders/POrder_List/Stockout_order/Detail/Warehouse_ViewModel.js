Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Warehouse_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Warehouse_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.POrderBomColorStore'
    ],
    stores: {
        POrderBomColorStore: {
            type: 'POrderBomColorStore'
        }
    },
    data: {
        porderid_link: 0
    }
})