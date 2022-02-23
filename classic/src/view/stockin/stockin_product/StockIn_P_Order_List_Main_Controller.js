Ext.define('GSmartApp.view.stockin.StockIn_P_Order_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_Order_List_Main_Controller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var StockinTypeStore = viewmodel.getStore('StockinTypeStore');
        StockinTypeStore.loadStore(21, 30);
        
        var listidtype_from = "8,9";
        var OrgFromStore = viewmodel.getStore('OrgFromStore');
        OrgFromStore.loadStore_byRoot(listidtype_from);

        var listidtype_to = "8";
        var orgtostore = viewmodel.getStore('OrgToStore');
        orgtostore.loadStore_byRoot(listidtype_to);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockindate_from_order').setValue(new Date(priorDate));

        // this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				// urlBack:'onSearch',
            },
            'StockIn_P_Main_Controller': {
                Reload_StockIn_P_Order_List: 'onSearch'
            }
        }
    },    
    control: {
        '#btnTimKiem_order': {
            click: 'onSearch'
        },
        '#StockIn_P_Order_List': {
            select: 'onStockin_Order_Select',
            itemdblclick: 'onCapNhatdbl',
            afterrender: 'onSearch'
        },
    },
    onStockin_Order_Select: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('stockin_order', selected.data);
        var StockinD_Store_Order = viewmodel.getStore('StockinD_Store_Order');
        // StockinD_Store.setData(selected.data.stockin_d);
        StockinD_Store_Order.loadStore_byStockinId(selected.data.id);
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        // console.log(record);
        var id = record.get('id');
        this.redirectTo("stockin_p_main/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockin_p_main/" + id + "/edit");
    },
    onSearch: function () {
        var me = this.getView();
        var t = this;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinStore_Order');

        var orgid_from_link = me.down('#OrgFromStore_order').getValue();
        var stockindate_from = me.down('#stockindate_from_order').getValue();
        var stockindate_to = me.down('#stockindate_to_order').getValue();
        var stockintypeid_link = me.down('#cbo_StockinTypeStore_order').getValue();
        var stockintypeid_link_from = 21;
        var stockintypeid_link_to = 30;
        var status = [-1];
        store.loadStore_Product(
            orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to,
            status, null, null);
    },
    onStockin_Order_Code_FilterKeyup:function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockin_Order_Store');
            // Access the field using its "reference" property name.
        var filterField = this.lookupReference('stockin_order_code_filter');
        var filters = store.getFilters();

        if (filterField.value) {
            this.stockin_order_code_filter = filters.add({
                id: 'stockin_order_code_filter',
                property: 'stockincode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockin_order_code_filter) {
            filters.remove(this.stockin_order_code_filter);
            this.stockin_order_code_filter = null;
        }
    },
    onStockin_Order_Invoice_FilterKeyup:function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockin_Order_Store');
            // Access the field using its "reference" property name.
        var filterField = this.lookupReference('stockin_order_invoice_filter');
        var filters = store.getFilters();

        if (filterField.value) {
            this.stockin_order_invoice_filter = filters.add({
                id: 'invoice_numberFilter',
                property: 'invoice_number',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockin_order_invoice_filter) {
            filters.remove(this.stockin_order_invoice_filter);
            this.stockin_order_invoice_filter = null;
        }
    },

    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('Stockin_Order_D_Store');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'skuCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    onFilterValueTenNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('Stockin_Order_D_Store');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'skuname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },

    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
})