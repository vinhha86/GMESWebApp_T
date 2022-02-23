Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_MainController',
    init: function() {
       
    },
    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        },
        '#btnTest': {
            tap: 'onBtnTestTap'
        },
        '#stockoutforcheckmain': {
            painted: 'onPainted'
        }
    },
    onPainted: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();

        // nếu là view nằm trong view xuất kho -> ẩn top bar (nút back)
        var is_stockout_m_view = viewmodel.get('is_stockout_m_view');
        if(is_stockout_m_view){
            me.down('#panel').setTbar(null);
        }

        //
        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-5);
		me.down('#fromDate').setValue(new Date(priorDate));
        var toDate = new Date().setDate(today.getDate()+5);
		me.down('#toDate').setValue(new Date(toDate));
        this.loadData(); 
    },
    onBtnTestTap: function(){
        this.loadData();
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var fromDate = this.lookupReference('fromDate').getValue();
        var toDate = this.lookupReference('toDate').getValue();
        var stockouttypeid_link = 1;
        var porder_grantid_link = null;

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage_KeHoachSanXuat(fromDate, toDate, 0, 0, 0, stockouttypeid_link, porder_grantid_link);
        Stockout_order_Store.getSorters().add({
            property: 'date_xuat_yc',
            direction: 'ASC'
        });
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
    onStockoutOrderFilterKeyup: function (){
        // console.log('here');
        var grid = this.getView().down('#Stockout_ForCheck_List'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#stockoutOrderFilter'),
            store = grid.store,
            filters = grid.store.getFilters();
        
        var value = filterField.getValue() == null ? '' : filterField.getValue().toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            if(
                rec.get('org_from_name').toLowerCase().includes(value) ||
                rec.get('org_to_name').toLowerCase().includes(value) ||
                rec.get('stockout_order_code').toLowerCase().includes(value) ||
                rec.get('porder_product_buyercode').toLowerCase().includes(value) ||
                Ext.Date.format(rec.get('date_xuat_yc'),'d/m/y').toLowerCase().includes(value) ||
                rec.get('skuCode').toLowerCase().includes(value)
                
            ){
                return true;
            }
            return false;
        });
    },
});
