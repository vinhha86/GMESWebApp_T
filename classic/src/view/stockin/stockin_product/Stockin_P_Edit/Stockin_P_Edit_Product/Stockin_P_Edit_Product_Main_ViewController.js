Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_Main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Edit_Product_Main_ViewController',
    init: function () {
        
    },
    listen: {
        store: {
            'ProductStore': {
                'ProductStore_load_Done': 'onProductStore_load_Done'
            },
            'SKUStore': {
                'SKUStore_load_Done': 'onSKUStore_load_Done'
            },
        }
    },
    control: {
        '#Stockin_P_Edit_Product_Main_View': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect',
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productSearchString = viewModel.get('productSearchString') == null ? null : viewModel.get('productSearchString').trim();
        if(productSearchString == null || productSearchString == ''){
            return;
        }

        me.setLoading(true);
        var ProductStore = viewModel.getStore('ProductStore');
        ProductStore.loadStore_forStockinProductSearch(productSearchString);
    },

    onProductStore_load_Done: function(){
        this.setLoadingFalse();
    },
    onSKUStore_load_Done: function(){
        this.setLoadingFalse();
    },
    setLoadingFalse: function(){
        var me = this.getView();
        me.setLoading(false);
    },

    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var select = me.down('#Stockin_P_Edit_Product_SKU_View').getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn cần chọn ít nhất một sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemSanPham", select);
    },

})