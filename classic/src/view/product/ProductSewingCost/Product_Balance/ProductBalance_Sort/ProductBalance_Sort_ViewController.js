Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance_Sort_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBalance_Sort_ViewController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    idAttribute: 0,
    init: function () {
        
    },
    control: {
        '#btnSort': {
            click: 'onSort'
        },
        '#btnSortDesc': {
            click: 'onSortDesc'
        },
        '#ProductBalance_Sort_View': {
            afterrender: 'onAfterrender'
        }
    },
    onAfterrender: function(){
        this.loadStore();
    },
    loadStore: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        ProductBalanceStore.loadStore(productid_link);
    },
    onDrop: function(node, data, dropRec, dropPosition){
        var m = this;
        var viewModel = this.getViewModel();

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var arrData = [];
        ProductBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });

        var params = new Object();
        params.msgtype = "PRODUCTBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/product_balance/product_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    // store.reload();
                    m.fireEvent('reloadProductBalanceStore');
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSort: function (){
        var m = this;
        var viewModel = this.getViewModel();

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        ProductBalanceStore.sort('balance_name','ASC');

        var arrData = [];

        ProductBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        ProductBalanceStore.sorters.clear();

        var params = new Object();
        params.msgtype = "PRODUCTBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/product_balance/product_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    ProductBalanceStore.load();
                    m.fireEvent('reloadProductBalanceStore');
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    ProductBalanceStore.load();
                }
            })
    },
    onSortDesc: function (){
        var m = this;
        var viewModel = this.getViewModel();

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        ProductBalanceStore.sort('balance_name','DESC');

        var arrData = [];

        ProductBalanceStore.each(function(rec,ind){
            var temp = new Object();
            temp.id = rec.get('id');
            temp.sortvalue = ind+1;
            arrData.push(temp);
        });
        ProductBalanceStore.sorters.clear();

        var params = new Object();
        params.msgtype = "PRODUCTBALANCE_REORDER";
        params.message = "Sap xep cum cong doan san pham";
        params.data = arrData;

        GSmartApp.Ajax.post('/api/v1/product_balance/product_balance_reorder', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    ProductBalanceStore.load();
                    m.fireEvent('reloadProductBalanceStore');
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    ProductBalanceStore.load();
                }
            })
    },
})