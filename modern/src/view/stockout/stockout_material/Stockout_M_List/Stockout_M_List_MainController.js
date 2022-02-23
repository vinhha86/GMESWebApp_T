Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.Stockout_M_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_List_MainController',
    init: function() {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutdate_from').setValue(new Date(priorDate));
        this.onSearch();
    },
    control: {
        // '#btnThem': {
        //     tap: 'onBtnThemTap'
        // },
    },
    onSearch: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var StockoutStore = viewModel.getStore('Stockout');

        var stockindate_from = me.down('#stockoutdate_from').getValue();
        var stockindate_to = me.down('#stockoutdate_to').getValue();
        var statuses = [-1,0,1,2];

        StockoutStore.loadByDate_Material(null, "", stockindate_from, stockindate_to, null, null,
            null, null, null, null, statuses);
        StockoutStore.getSorters().add({
            property: 'stockoutdate',
            direction: 'ASC'
        });
    },
    onStockout_M_ListFilterKeyup: function(){
        var viewModel = this.getViewModel();
        var filterField = this.getView().down('#stockout_M_ListFilter');
        var store = viewModel.getStore('Stockout');
        
        var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            // console.log(rec);
            if(
                rec.get('stockoutcode').toLowerCase().includes(value) ||
                rec.get('stockout_order_code').toLowerCase().includes(value) ||
                rec.get('porder_product_buyercode').toLowerCase().includes(value) ||
                rec.get('org_to_name').toLowerCase().includes(value) ||
                rec.get('statusString').toLowerCase().includes(value) || 
                Ext.Date.format(rec.get('stockoutdate'),'d/m/y').toLowerCase().includes(value)
                
            ){
                return true;
            }
            return false;
        });
    }
});
