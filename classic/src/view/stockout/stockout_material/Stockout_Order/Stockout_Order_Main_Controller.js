Ext.define('GSmartApp.view.stockout.Stockout_Order_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Order_Main_Controller',
    init: function () {
        // this.callParent(arguments);
        var me = this.getView();

        var today = new Date();
        var priorDate = new Date().setDate(today.getDate() - 30);
        me.down('#stockoutorderdate_from').setValue(new Date(priorDate));

        this.onOrderSearch();

        // var store_stockout = this.getViewModel().getStore('Stockout');
        // if (store_stockout) {
        //     var page = store_stockout.currentPage;
        //     if (page == null) {
        //         page = 1;
        //     }
        //      store_stockout.loadByDate(0,'', new Date(),new Date(), page, 25, 0 ,0);
        // }
    },
    onActivate: function () {
        this.onOrderSearch();
    },
    listen: {
        controller: {
            '*': {
                urlBack: 'onOrderSearch',
            },
            'Stockout_M_Main_Controller': {
                onReload_StockoutOrderList: 'onOrderSearch'
            }
        }
    },
    control: {
        '#Stockout_Order': {
            select: 'onStockout_orderSelect'
        },
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onStockout_orderSelect: function (e, selected, eOpts) {
        // console.log(selected);
        var viewmodel = this.getViewModel();
        var storeDetail = viewmodel.getStore('Stockout_order_d_Store');
        storeDetail.removeAll();
        storeDetail.GetByStockoutOrder(selected.data.id);
    },
    onOrderSearch: function () {
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('Stockout_order_Store');

        // var limit = me.down('#orderlimitpage').getValue();
        // var stockouttypeid = me.down('#stockouttypeid').getValue();
        var fromDate = me.down('#stockoutorderdate_from').getValue();
        var toDate = me.down('#stockoutorderdate_to').getValue();
        var status = 0;
        var stockouttypeid_link = 1;

        store.loadStore_byPage(fromDate, toDate, null, null, status, stockouttypeid_link);
        var storeDetail = viewModel.getStore('Stockout_order_d_Store');
        if(storeDetail) storeDetail.removeAll();
    },

    onMenu_StockoutOrderList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Tạo phiếu Xuất NPL cho nhà cắt',
                    itemId: 'btnMenu_StockoutOrderList_Cat',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-edit brownIcon',
                    handler: function () {
                        // console.log(record);
                        var stockoutorderidObj = new Object();
                        stockoutorderidObj.id = record.get('id');
                        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
                        me.redirectTo('stockout_m/1/create');
                        // me.redirectTo('stockout_m/1/create/16');
                        // me.redirectTo('stockout_m/1/create/' + record.get('id'));
                    },
                },
                {
                    text: 'Tạo phiếu Xuất điều chuyển',
                    itemId: 'btnMenu_StockoutOrderList_GiaCong',
                    separator: true,
                    margin: '10 0 0',
                    // iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        var stockoutorderidObj = new Object();
                        stockoutorderidObj.id = record.get('id');
                        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
                        me.redirectTo('stockout_m/2/create');
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },

    // filter
    onPorder_product_buyercodeFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('porder_product_buyercodeFilterValue');
        var store = this.getViewModel().getStore('Stockout_order_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.porder_product_buyercodeFilter = filters.add({
                id: 'porder_product_buyercodeFilter',
                property: 'porder_product_buyercode',
                value: filterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porder_product_buyercodeFilter) {
            filters.remove(this.porder_product_buyercodeFilter);
            this.porder_product_buyercodeFilter = null;
        }

        // console.log(filterValue);
    },
    onPorder_codeFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('porder_codeFilterValue');
        var store = this.getViewModel().getStore('Stockout_order_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.porder_codeFilter = filters.add({
                id: 'porder_codeFilter',
                property: 'porder_code',
                value: filterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porder_codeFilter) {
            filters.remove(this.porder_codeFilter);
            this.porder_codeFilter = null;
        }
    },
    onStockout_order_codeFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('stockout_order_codeFilterValue');
        var store = this.getViewModel().getStore('Stockout_order_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.porder_codeFilter = filters.add({
                id: 'stockout_order_codeFilter',
                property: 'stockout_order_code',
                value: filterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockout_order_codeFilter) {
            filters.remove(this.stockout_order_codeFilter);
            this.stockout_order_codeFilter = null;
        }
    },
    onOrg_from_nameFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('org_from_nameFilterValue');
        var store = this.getViewModel().getStore('Stockout_order_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.org_from_nameFilter = filters.add({
                id: 'org_from_nameFilter',
                property: 'org_from_name',
                value: filterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.org_from_nameFilter) {
            filters.remove(this.org_from_nameFilter);
            this.org_from_nameFilter = null;
        }
    },
    onOrg_to_nameFilterKeyup:function(){
        var viewModel = this.getViewModel();
        var filterValue = viewModel.get('org_to_nameFilterValue');
        var store = this.getViewModel().getStore('Stockout_order_Store');
        var filters = store.getFilters();

        if (filterValue != null) {
            this.org_to_nameFilter = filters.add({
                id: 'org_to_nameFilter',
                property: 'org_to_name',
                value: filterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.org_to_nameFilter) {
            filters.remove(this.org_to_nameFilter);
            this.org_to_nameFilter = null;
        }
    },
});
