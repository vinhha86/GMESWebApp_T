Ext.define('GSmartApp.view.stockout.stockout_material.stockout_order.Stockout_Order_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Order_MainController',
    init: function() {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutorderdate_from').setValue(new Date(priorDate));

        this.onOrderSearch();
    },
    control: {
        // '#btnThem': {
        //     tap: 'onBtnThemTap'
        // },
    },
    onOrderSearch: function(){
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');

        var fromDate = me.down('#stockoutorderdate_from').getValue();
        var toDate = me.down('#stockoutorderdate_to').getValue();
        
        Stockout_order_Store.loadStore_byPage(fromDate, toDate, 0, 0, 0);
        Stockout_order_Store.getSorters().add({
            property: 'orderdate',
            direction: 'ASC'
        });
    },
    onStockout_M_OrderFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterField = this.getView().down('#stockout_M_OrderFilter');
        var store = viewModel.getStore('Stockout_order_Store');
        
        var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            // console.log(rec);
            if(
                rec.get('porder_product_buyercode').toLowerCase().includes(value) ||
                rec.get('porder_code').toLowerCase().includes(value) ||
                rec.get('stockout_order_code').toLowerCase().includes(value) ||
                rec.get('typename').toLowerCase().includes(value) || 
                rec.get('org_to_name').toLowerCase().includes(value) ||
                rec.get('statusName').toLowerCase().includes(value) || 
                Ext.Date.format(rec.get('orderdate'),'d/m/y').toLowerCase().includes(value)
                
            ){
                return true;
            }
            return false;
        });
    }
});
