Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_Plan_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrderGrant_SKU_PlanStore',
        'GSmartApp.store.stockout_order.Stockout_order_Store'
    ],
    stores: {
        POrderGrant_SKU_PlanStore: {
            type: 'POrderGrant_SKU_PlanStore'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        }
    },
    data: {
        sourceView: null,
        eventRecord: null,
        porder_grantid_link: null
    },
    formulas: {
        // isHiddenYard: function (get) {
        //     if (get('order.unitid_link') == 1) return true;
        //     return false;
        // },
    }
})