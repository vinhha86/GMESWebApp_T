Ext.define('GSmartApp.view.stockout.Stockout_M_List_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_List_Main_Controller',
    init: function(){
        // var viewModel = this.getViewModel();
		// var UnitStore = viewModel.getStore('UnitStore');
		// if (null!=UnitStore) UnitStore.loadStore();
    },
    control: {
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    // renderUnit: function(val, meta, record, rindex, cindex, store) {
    //     if (null != val){
    //         var viewModel = this.getViewModel();
    //         var UnitStore = viewModel.getStore('UnitStore');
    //         if (null!=UnitStore){
    //             var objUnit = UnitStore.data.find('id', val);
    //             // console.log(objUnit.data);
    //             return objUnit.data.code;
    //         }
    //     }
    // },
    // onFilterValueMaNPLKeyup: function () {
    //     var viewmodel = this.getViewModel();
    //     var store = viewmodel.get('StockoutD_Store');
    //     var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
    //         filters = store.getFilters();

    //     if (filterField.value) {
    //         this.ValueFilterFieldMaNPL = filters.add({
    //             id: 'ValueFilterFieldMaNPL',
    //             property: 'skucode',
    //             value: filterField.value,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //     }
    //     else if (this.ValueFilterFieldMaNPL) {
    //         filters.remove(this.ValueFilterFieldMaNPL);
    //         this.ValueFilterFieldMaNPL = null;
    //     }
    // },
    // onFilterValueTenNPLKeyup: function () {
    //     var viewmodel = this.getViewModel();
    //     var store = viewmodel.get('StockoutD_Store');
    //     var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
    //         filters = store.getFilters();

    //     if (filterField.value) {
    //         this.ValueFilterFieldTenNPL = filters.add({
    //             id: 'ValueFilterFieldTenNPL',
    //             property: 'skuname',
    //             value: filterField.value,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //     }
    //     else if (this.ValueFilterFieldTenNPL) {
    //         filters.remove(this.ValueFilterFieldTenNPL);
    //         this.ValueFilterFieldTenNPL = null;
    //     }
    // },
})