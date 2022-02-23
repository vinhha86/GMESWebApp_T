Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_NPL_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_NPL_ViewCotroller',
    init: function () {
    },
    control: {
        '#btnHideNPL': {
            click: 'onHideNPL'
        },
        '#CutPlan_NPL_View': {
            itemclick: 'onSelectNPL'
        }
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ProductStore');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'product_code',
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
    onHideNPL: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', 0);
        // var form = this.getView();
        // form.collapse('left', 0);

        viewmodel.set('isHiddenNPL', true);
    },
    onSelectNPL: function (grid, record, item, index, e, eOpts) {
        var me = this;
        var viewmodel = this.getViewModel();
        viewmodel.set('npl', record.data);


        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');
        var npl = viewmodel.get('npl');

        //load combo loai phoi
        var LoaiPhoiStore = viewmodel.getStore('LoaiPhoiStore');
        LoaiPhoiStore.loadStore(pcontractid_link, productid_link, npl.id);

        //load dinh muc
        var storeBom = viewmodel.getStore('POrderBom2Store');
        storeBom.getbom_by_porder_mat(null, pcontractid_link, productid_link, npl.id);
    }
})