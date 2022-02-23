Ext.define('GSmartApp.view.stock_product.StockProductController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockProductController',
    init: function () {
        this.onloadPage(); // open this
    },
    control: {
        '#btnSearch': {
            click: 'onloadPage'
        },
        '#btnResetTree': {
            click: 'onResetTree'
        },
        '#txtMaHang': {
            specialkey: 'onSpecialkey'
        },
        '#txtDonHang': {
            specialkey: 'onSpecialkey'
        },
        '#Sku_AutoComplete': {
            beforeQuery: 'Sku_AutoComplete_beforeQuery'
        },
    },
    listen: {
        store: {
            'StockProductTreeStore': {
                'loadStore_Done': 'onloadStore_Done'
            }
        }
    },
    Sku_AutoComplete_beforeQuery: function(){
        var viewModel = this.getViewModel();
        var Sku_AutoComplete = viewModel.getStore('Sku_AutoComplete');
        var typeFrom = 10;
        var typeTo = 20;
        Sku_AutoComplete.proxy.extraParams = {
            typeFrom: typeFrom,
            typeTo: typeTo
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        //
        var searchObj = viewModel.get('searchObj');
        // var maHang = searchObj.maHang == null ? null : searchObj.maHang.trim();
        var maHangId = searchObj.maHangId;
        var donHang = searchObj.donHang == null ? null : searchObj.donHang.trim();
        //
        if(isNaN(maHangId)) maHangId = null;
        //
        me.setLoading("Đang tải dữ liệu");
        var StockProductTreeStore = viewModel.getStore('StockProductTreeStore');
        StockProductTreeStore.loadStore(maHangId, donHang);
        StockProductTreeStore.getSorters().add({
            property: 'khoangKhongXacDinh',
            direction: 'ASC'
        },{
            property: 'name',
            direction: 'ASC'
        });

        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.getSorters().removeAll();
        WarehouseStore.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'colorname',
            direction: 'ASC'
        });
        // store.clearFilter();
        WarehouseStore.removeAll();
    },
    onResetTree: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();

        // viewModel.set('searchObj.maHang', null);
        viewModel.set('searchObj.maHangId', null);
        viewModel.set('searchObj.donHang', null);
        var WarehouseStore = viewModel.get('WarehouseStore');
        WarehouseStore.clearFilter();
        WarehouseStore.removeAll();

        this.onloadPage();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadStore_Done: function () {
        this.getView().setLoading(false);
    },
    // filter cho danh sach npl (theo 2 txt field maHang va donHang)
    onMaHangFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filterField = this.lookupReference('ValueFilterFieldMaHang'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaHang = filters.add({
                id: 'ValueFilterFieldMaHang',
                property: 'skucode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaHang) {
            filters.remove(this.ValueFilterFieldMaHang);
            this.ValueFilterFieldMaHang = null;
        }
    },
    onSelectMaHangId: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('WarehouseStore');
        var filters = store.getFilters();

        var maHangId = viewmodel.get('searchObj.maHangId');
        if(isNaN(maHangId)) maHangId = null;

        if (maHangId) {
            this.ValueFilterFieldmaHangId = filters.add({
                id: 'ValueFilterFieldmaHangId',
                property: 'skuid_link',
                value: maHangId,
                exactMatch: true,
            });
        }
        else if (this.ValueFilterFieldmaHangId) {
            filters.remove(this.ValueFilterFieldmaHangId);
            this.ValueFilterFieldmaHangId = null;
        }
    }
})