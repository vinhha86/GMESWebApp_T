Ext.define('GSmartApp.view.product.ProductInfoViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductInfoViewCotroller',
    init: function () {
        var me = this.getView();

        var userStore = this.getViewModel().getStore('UserStore');
        userStore.loadStore();

        if (this.getView().IdProduct == 0) {
            this.getView().getForm().reset();
        }

        me.down('#code').focus();
    },
    control: {
        '#buyercode': {
            focusleave: 'onleavebuyercode'
        }
    },
    onleavebuyercode: function(){
        var viewModel = this.getViewModel();
        if(viewModel.get('product.vendorcode')== ""){
            viewModel.set('product.vendorcode', viewModel.get('product.buyercode'));
            viewModel.set('product.code', viewModel.get('product.buyercode'));
        }
            
    },
    loadInfo: function (id) {
        if (id == 0) {
            this.getView().getForm().reset();
            return;
        }

        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        viewModel.set('product', response.data);
                        viewModel.set('img',response.img);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})