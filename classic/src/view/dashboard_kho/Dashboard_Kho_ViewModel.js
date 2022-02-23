Ext.define('GSmartApp.view.dashboard_kho.Dashboard_Kho_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Dashboard_Kho_ViewModel',
    requires: [
        'GSmartApp.store.POrder_Grant',
        'GSmartApp.store.stockout_order.Stockout_order_Store'
    ],
    stores: {
        KeHoachVaoChuyenStore: {
            type: 'POrder_Grant'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        }
    },
    data: {
        pordergrantid_link: null
    }
})