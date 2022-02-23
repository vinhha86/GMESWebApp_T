Ext.define('GSmartApp.view.balance.PContractProductTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductTreeViewController',
    init: function () {
    },
    control: {

    },

    onStyleCodeFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewmodel.getStore('PContractProductTreeStoreBalance'),
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
    onCalBalance_ManyProduct: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        var viewmodel = this.getViewModel();
        var SKUBalanceStore = viewmodel.getStore('SKUBalanceStore');

        //Nếu không chọn NPL --> Chỉ cho tính riêng từng mã hàng
        if (viewmodel.get('Balance.p_selection_mode') == 'SINGLE' && select.length > 1){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Nếu không chọn Nguyên phụ liệu, bạn chỉ được chọn 1 mã hàng để tính cân đối',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }

        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.pcontract_poid_link = null;
        params.materialid_link =viewmodel.get('Balance.materialid_link');
        if (params.materialid_link < 0) params.materialid_link = null;

        var list_id_product = '';
        for (k=0;k<select.length;k++){
            p_select = select[k];
            if (p_select.get('children').length > 0) {
                for (var i = 0; i < p_select.get('children').length; i++) {
                    var data = p_select.get('children')[i];
                    if (i == 0) {
                        list_id_product = data.productid_link;
                    }
                    else {
                        list_id_product += data.productid_link + ";";
                    }
                }
            }
            else {
                list_id_product +=  p_select.get('productid_link') + ";";
            }
        }
        console.log(list_id_product);
        params.list_productid = list_id_product;

        me.setLoading("Đang tính cân đối");
        if (null != params.pcontract_poid_link && 0 != params.pcontract_poid_link) {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        }
    }
})