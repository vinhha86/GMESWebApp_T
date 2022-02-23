Ext.define('GSmartApp.view.process_shipping.POrder.POrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderViewController',
    init: function () {

    },
    control: {
        'POrderView': {
            itemclick: 'onSelectPOrder'
        },
        '#btnMoRong': {
            click: 'onMoRong'
        },
        '#btnThuGon': {
            click: 'onThuGon'
        }
    },
    listen: {
        store: {
            'POrder_ListStore': {
                'LoadSoLuongLenh': 'onSelectPOrder'
            }
        }
    },
    onMoRong: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('heightPOLine', 0);
        viewmodel.set('IsOpen', !viewmodel.get('IsOpen'));
    },
    onThuGon: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('heightPOLine', '50%');
        viewmodel.set('IsOpen', !viewmodel.get('IsOpen'));
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onOrderCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrder_ListStore');
        var filterField = this.lookupReference('ordercodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ordercodeFilterField = filters.add({
                id: 'ordercodeFilterField',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ordercodeFilterField) {
            filters.remove(this.ordercodeFilterField);
            this.ordercodeFilterField = null;
        }
    },
    onSelectPOrder: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        grid.getSelectionModel().select(record, true, true);
        var porderid_link = record.get('porderid_link');
        var productid_link = record.get('productid_link');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        viewmodel.set('porderid_link', porderid_link);
        viewmodel.set('productid_link', productid_link);
        viewmodel.set('productid_link', productid_link);
        viewmodel.set('pcontractid_link', record.get('pcontractid_link'));
        viewmodel.set('IdGrant', 0);

        //load sku cua lenh san xuat
        var storesku = viewmodel.getStore('porderSKUStore');
        storesku.loadByPorder_And_PO(porderid_link, pcontract_poid_link);

        //load ds to da phan chuyen
        var storeGrant = viewmodel.getStore('POrder_ListGrantStore');
        storeGrant.loadStore(porderid_link);

        //load can doi 
        var SKUBalanceStore_Mat = viewmodel.getStore('SKUBalanceStore_Mat');
        SKUBalanceStore_Mat.setGroupField('mat_sku_product_typename');
        SKUBalanceStore_Mat.loadBalancePOrder(porderid_link);

        //filter mau co cua po-line chi lay san pham dc chon
        var store = viewmodel.get('POLineSKU_Store');
        var filters = store.getFilters();

        this.ordercodeFilterField = filters.add({
            property: 'productid_link',
            value: productid_link,
            anyMatch: true,
            caseSensitive: false
        });
    }
})