Ext.define('GSmartApp.view.stockout.stockout_material.stockout_order.Stockout_OrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_OrderController',
    init: function() {
        
    },
    control: {
        '#Stockout_Order': {
            select: 'onStockout_orderSelect'
        },
    },
    onStockout_orderSelect: function (e, selected, eOpts) {
        // console.log(selected);
        var viewModel = this.getViewModel();
        var storeDetail = viewModel.getStore('Stockout_order_d_store');
        // storeDetail.removeAll();
        storeDetail.GetByStockoutOrder(selected.data.id);
    },
});
