Ext.define('GSmartApp.view.stockin.StockIn_P_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_List_Main_Controller',
    isActivate: false,
    init: function () {
        
    },
	listen: {
        controller: {
            '*': {
				// urlBack:'onSearch',
            },
            'StockIn_P_Main_Controller': {
                Reload_StockIn_P_List: 'onSearch'
            }
        }
    },    
    control: {
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#StockIn_P_List_Main': {
            afterrender: 'onAfterrender'
        },
        '#StockIn_P_List': {
            select: 'onStockinSelect',
            itemdblclick: 'onCapNhatdbl',
            // afterrender: 'onSearch'
        },
        // '#btnTaoPhieuNhap': {
        //     click: 'onBtnTaoPhieuNhap'
        // },
        '#btnTaoPhieuNhapMoi': {
            click: 'onBtnTaoPhieuNhapMoi'
        },
        '#btnTaoPhieuNhapDieuChuyen': {
            click: 'onBtnTaoPhieuNhapDieuChuyen'
        },
    },
    onAfterrender: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        
        var StockinTypeStore = viewmodel.getStore('StockinTypeStore');
        StockinTypeStore.loadStore(21, 30);
        
        var listidtype_from = "8,9";
        var OrgFromStore = viewmodel.getStore('OrgFromStore');
        OrgFromStore.loadStore_byRoot(listidtype_from);

        var listidtype_to = "8";
        var OrgToStore = viewmodel.getStore('OrgToStore');
        OrgToStore.loadStore_byRoot(listidtype_to);

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockindate_from').setValue(new Date(priorDate));

        this.onSearch();
    },
    onStockinSelect: function (e, selected, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('stockin', selected.data);
        var StockinD_Store = viewmodel.getStore('StockinD_Store');
        // StockinD_Store.setData(selected.data.stockin_d);
        StockinD_Store.loadStore_byStockinId(selected.data.id);
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
        var store = viewModel.getStore('StockinStore');

        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        var stockintypeid_link = me.down('#cbo_StockinTypeStore').getValue();
        var stockintypeid_link_from = 21;
        var stockintypeid_link_to = 30;
        var status = [0,1,2];
        store.loadStore_Product(
            orgid_from_link, stockindate_from, stockindate_to, 
            stockintypeid_link, stockintypeid_link_from, stockintypeid_link_to,
            status, null, null);
    },
    onBtnTaoPhieuNhap: function(){
        this.redirectTo("stockin_p_main/0/create");
    },
    onBtnTaoPhieuNhapMoi: function(){
        this.redirectTo("stockin_p_main/21/create");
    },
    onBtnTaoPhieuNhapDieuChuyen: function(){
        this.redirectTo("stockin_p_main/22/create");
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockincode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu nhập "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa");
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            me.setLoading(false);
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }
                        }
                })
                }
            }
        });
    },

    onStockincodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stockincodeFilter'),
            store = this.getViewModel().getStore('StockinStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.stockincodeFilter = filters.add({
                id: 'stockincodeFilter',
                property: 'stockincode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.stockincodeFilter) {
            filters.remove(this.stockincodeFilter);
            this.stockincodeFilter = null;
        }
    },
    onInvoice_numberFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('invoice_numberFilter'),
            store = this.getViewModel().getStore('StockinStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.invoice_numberFilter = filters.add({
                id: 'invoice_numberFilter',
                property: 'invoice_number',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.invoice_numberFilter) {
            filters.remove(this.invoice_numberFilter);
            this.invoice_numberFilter = null;
        }
    },

    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('StockinD_Store');
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
        var store = viewmodel.get('StockinD_Store');
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