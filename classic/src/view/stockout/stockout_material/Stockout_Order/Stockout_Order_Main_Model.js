Ext.define('GSmartApp.view.stockout.Stockout_Order_Main_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_Order_Main_Model',
    stores: {
        Stockout_order_Store: {
            type: 'Stockout_order_Store'
        },
        Stockout_order_d_Store: {
            type: 'Stockout_order_d_store'
        },
	},
    data: {
        // filter
        porder_product_buyercodeFilterValue: null,
        porder_codeFilterValue: null,
        stockout_order_codeFilterValue: null,
        org_from_nameFilterValue: null,
        org_to_nameFilterValue: null,
    }
});
