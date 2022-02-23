Ext.define('GSmartApp.view.Recon.Recon_ProductTree_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Recon_ProductTree_Controller',
    init: function () {
    },
    control: {

    },
    onStyleCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewmodel.getStore('PContractProductTreeStoreRecon'),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onCalRecon_ManyProduct: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();
        var ReconProduct_Store = viewmodel.getStore('ReconProduct_Store');
        var ReconMaterial_Store = viewmodel.getStore('ReconMaterial_Store');

        var params = new Object();
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.pcontract_poid_link = null;

        var list_id_product = '';
        if (select.length > 0) {
            for (var i = 0; i < select.length; i++) {
                var data = select[i];
                if (i == 0) {
                    list_id_product = data.data.productid_link;
                }
                else {
                    list_id_product += ";" + data.data.productid_link;
                }
            }
        }
        else {
            list_id_product = select[0].get('productid_link');
        }
        params.list_productid = list_id_product;

        me.setLoading("Đang tính quyết toán");

        GSmartApp.Ajax.post_longtimeout('/api/v1/recon/cal_recon_bycontract', Ext.JSON.encode(params),
        function (success, response, options) {
            me.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    ReconProduct_Store.setData(response.productsku_data);
                    ReconMaterial_Store.setData(response.data);
                }
            }
        })
    }
})