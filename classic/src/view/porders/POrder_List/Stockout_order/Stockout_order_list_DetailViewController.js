Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_list_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_list_DetailViewController',
    init: function () {
        
    },
    control: {

    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('Stockout_order_d_Store');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'materialCode',
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
        var store = viewmodel.get('Stockout_order_d_Store');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'materialName',
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
})