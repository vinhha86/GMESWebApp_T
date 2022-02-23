Ext.define('GSmartApp.view.stockin.stockin_submaterial.Stockin_SubM_Order_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_SubM_Order_List_Controller',
    isActivate: false,
    init: function () {
        // var me = this.getView();
        // var viewModel = this.getViewModel();

        // var StockinTypeStore = viewModel.getStore('StockinTypeStore');
        // StockinTypeStore.loadStore(11, 20);
        
        // var listidtypefrom = "5,19";
        // var OrgFromStore = viewModel.getStore('OrgFromStore');
        // OrgFromStore.loadStoreByOrgTypeString(listidtypefrom);

        // var OrgToStore = viewModel.getStore('OrgToStore');
        // var listidtypeto = "19";
		// OrgToStore.loadStore_allchildren_byorg(listidtypeto);

        // var today = new Date();
		// var priorDate = new Date().setDate(today.getDate()-30);
        // viewModel.set('searchObj.stockindate_from', new Date(priorDate));

        this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				
            },
            'Stockin_SubM_Main_Controller': {
                Reload_Stockin_SubM_Order_List: 'onSearch'
            }
        }
    },    
    control: {
        '#btnTimKiem_order': {
            click: 'onSearch'
        },
        '#Stockin_SubM_Order_List': {
            select: 'onStockin_Order_Select',
            itemdblclick: 'onCapNhatdbl',
            // afterrender: 'onSearch'
        },
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        // console.log(record);
        var id = record.get('id');
        this.redirectTo("stockin_subm/" + id + "/edit");
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
        var searchObj = viewModel.get('searchObj');
        var store = viewModel.getStore('Stockin_Order_Store');

        var orgid_from_link = searchObj.orgid_from_link;
        var stockindate_from = searchObj.stockindate_from;
        var stockindate_to = searchObj.stockindate_to;
        var stockintypeid_link = searchObj.stockintypeid_link;
        var stockintypeid_link_from = 11;
        var stockintypeid_link_to = 20;
        var status = [-1];

        store.loadStore_Material(orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to, 
            status, null, null, null, null, null, null);
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

    onStockin_Order_Select: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        var Stockin_Order_D_Store = viewmodel.getStore('Stockin_Order_D_Store');
        Stockin_Order_D_Store.setData(selected.data.stockin_d);
        // console.log(selected.data.stockin_d);
    },
})