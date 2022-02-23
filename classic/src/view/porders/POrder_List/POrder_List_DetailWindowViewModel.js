Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_List_DetailWindowViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStatusStore',
        'GSmartApp.store.porder.POrder_ListVendorStore',
        'GSmartApp.store.porder.POrder_ListBuyerStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.porder.porderSKUStore',
        'GSmartApp.store.porder.POrder_ListGrantStore',
        'GSmartApp.store.porder.POrder_ListGrantSKUStore',
        'GSmartApp.store.pcontract.POrderBomColorStore',
        'GSmartApp.store.porder.PorderSewingCostStore',
        'GSmartApp.store.pprocess.POrderGrantStore',
        'GSmartApp.store.stockout_order.Stockout_order_d_store',
        'GSmartApp.store.stockout_order.Stockout_order_Store',
        'GSmartApp.store.pcontract.PContractSKUStore',
    ],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        POrder_ListVendorStore: {
            type: 'POrder_ListVendorStore'
        },
        POrder_ListBuyerStore: {
            type: 'POrder_ListBuyerStore'
        },
        POrder_ListStatusStore: {
            type: 'POrder_ListStatusStore'
        },
        PContract_PO: {
            type: 'PContract_PO'
        },
        porderSKUStore: {
            type: 'porderSKUStore'
        },
        POrder_ListGrantStore: {
            type: 'POrder_ListGrantStore'
        },
        POrder_ListGrantSKUStore: {
            type: 'POrder_ListGrantSKUStore'
        },
        POrder_ListGrantSKUStoreForWindow: {
            type: 'POrder_ListGrantSKUStore'
        },
        POrderBomColorStore: {
            type: 'POrderBomColorStore'
        },
        POrderBom2Store: {
            type: 'POrderBomColorStore'
        },
        PorderSewingCostStore: {
            type: 'PorderSewingCostStore'
        },
        POrderGrantStore: {
            type: 'POrderGrantStore'
        },
        porderprocessing: {
            type: 'porderprocessing'
        },
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
        Stockout_order_d_Store: {
            type: 'Stockout_order_d_store'
        },
        POLineSKU_Store: {
            type: 'PContractSKUStore'
        }
    },
    data: {
        IdPOrder: null,
        IdGrant: null,
        pcontract_poid_link: null,
        POrder_grant: null,
        isEditSL: false,
        //
        grantSKUViewTabInfoTitle: 'Chi tiết màu, cỡ',
        //
        porderinfo: '',
        amount: 0,
        is_poline_hidden: false,
        is_poline_sku_hidden: false,
        is_addremovesku_hidden: false,
        is_poline_skugranted_hidden: false,
        fieldstyle_sl: 'font-size:12px;text-align:right;background-color:white;color:black',
        fieldstyle_date: 'font-size:12px;text-align:right;background-color:white;color:black',
        width_sku_poline: 0,
        order: {

        }
    }
})