Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_Grant_Plan_StockoutOrder_Edit_ViewModel',
    requires: [
        'GSmartApp.store.stockout_order.Stockout_order_d_store',
        'GSmartApp.store.stockout_order.Stockout_order_pkl_Store',
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
    stores: {
        Stockout_order_d_store: {
            type: 'Stockout_order_d_store'
        },
        Stockout_order_pkl_Store: {
            type: 'Stockout_order_pkl_Store'
        },
        WarehouseStore: {
            type: 'WarehouseStore'
        },
        DateStore:{
			// type: 'DateStore'
		},
    },
    data: {
        eventRecord: null,

        id: null,
        date_list: null,
        pordergrantid_link: null,

        // stockout_order_d_view
        stockout_order_d_selected_record: null,

        // stockout_order
        stockout_order: null,
    },
    formulas: {
        isBtnCreateHidden: function (get) {
            var id = get('id');
            if(id != null && id != 0){
                return true;
            }
            return false;
        },
        isBtnSaveHidden: function (get) {
            var id = get('id');
            if(id != null && id != 0){
                return false;
            }
            return true;
        },
    }
})