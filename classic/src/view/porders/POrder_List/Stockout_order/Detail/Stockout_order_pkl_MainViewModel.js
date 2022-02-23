Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_pkl_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_order_pkl_MainViewModel',
    requires: [
        'GSmartApp.store.warehouse.WarehouseStore',
        'GSmartApp.store.stockout_order.Stockout_order_pkl_Store'
    ],
    stores: {
        WarehouseStore: {
            type: 'WarehouseStore'
        },
        Stockout_order_pkl_Store: {
            type: 'Stockout_order_pkl_Store'
        }
    },
    data: {
        width_npl: '100%',
        material_skuid_link: 0,
        org_from_id_link: 0,
        porderid_link: 0,
        type: {
            type: 1
        },
        stockout_orderid_link: 0,
        stockoutorderdid_link: 0
    }
})