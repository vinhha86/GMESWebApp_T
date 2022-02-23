Ext.define('GSmartApp.view.stockout_product.stockout_p_order.Stockout_P_Order_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Stockout_P_Order_ViewModel',
    stores:{
        Stockout_P_Order_Store: {
            type: 'Stockout_order_Store'
        }
    },
	data: {
        stockout_order: {
            id: null,
            timecreate: '',
            stockout_order_d: []
        }
    }
})