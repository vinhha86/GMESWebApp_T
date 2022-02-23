Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_MainController',
    init: function() {
        var viewModel = this.getViewModel();
    },
    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        },
        '#TabView':{
            activeItemchange: 'onTabViewActiveItemchange'
        },
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        switch(value.title){
            case 'Phiếu xuất':
                var Stockout = viewModel.getStore('Stockout');
                Stockout.reload();
                // Stockin_d_Store.loadStore_byStockinId_async(stockinid_link);
                break;
            case 'Yêu cầu xuất':
                // var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
                // Stockout_order_Store.reload();
                // var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
                // Stockout_order_d_store.removeAll();
                var Stockout_order_Store = me.down('#stockoutforcheckmain').getViewModel().getStore('Stockout_order_Store');
                Stockout_order_Store.reload();
                break;
            default: 
                console.log('tab title không tồn tại');
                break;
        }
    },
});
