Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_SKU_Plan_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrderGrant_SKU_Store',
        'GSmartApp.store.porder.POrderGrant_SKU_PlanStore',
        'GSmartApp.store.porder.POrderGrant_SKU_Plan_MaterialStore',
        'GSmartApp.store.SKUBalanceStore',
        'GSmartApp.store.stockout_order.Stockout_order_Store'
    ],
    stores: {
        POrderGrant_SKU_Store: {
            type: 'POrderGrant_SKU_Store'
        },
        POrderGrant_SKU_PlanStore: {
            type: 'POrderGrant_SKU_PlanStore'
        },
        POrderGrant_SKU_Plan_MaterialStore: {
            type: 'POrderGrant_SKU_Plan_MaterialStore'
        },
        SKUBalanceStore: {
            type: 'SKUBalanceStore'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
    },
    data: {
        sourceView: null, // SchedulePlan, Dashboard_KhoTP_POLine_Main, 
        eventRecord: null,
        porder_grantid_link: null,

        //
        total_porderGrant_SKU_grantamount: null,
        lineinfo: null,
        //
        listtitle: null, // list date column
    },
    formulas: {
        // isHiddenYard: function (get) {
        //     if (get('order.unitid_link') == 1) return true;
        //     return false;
        // },
    }
})