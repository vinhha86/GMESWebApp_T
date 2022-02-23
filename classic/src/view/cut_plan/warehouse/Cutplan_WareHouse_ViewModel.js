Ext.define('GSmartApp.view.cutplan.warehouse.Cutplan_WareHouse_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Cutplan_WareHouse_ViewModel',
    requires: ['GSmartApp.store.warehouse.WarehouseStore'],
    stores: {
        WarehouseStore: {
            type: 'WarehouseStore'
        },
        WarehouseCutplanStore: {
            type: 'WarehouseStore'
        }
    },
    data: {
        width_npl: '100%',
        type: {
            type: 1
        },
        porderid_link : 0
    }
})