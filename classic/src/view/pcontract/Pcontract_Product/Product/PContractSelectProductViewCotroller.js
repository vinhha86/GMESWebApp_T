Ext.define('GSmartApp.view.pcontract.PContractSelectProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSelectProductViewCotroller',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ProductStore');
        store.loadProduct_ByPage(25, 1, "", "");
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#PContractSelectProductView': {
            activate: 'onActivate'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#page': {
            specialkey: 'onSpecialkey'
        },
        '#name': {
            specialkey: 'onSpecialkey'
        },
        '#code': {
            specialkey: 'onSpecialkey'
        },
        '#btnChon':{
            click: 'onChon'
        }
    },
    onActivate: function () {
        var me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
    },
    onChon: function(){
        var me = this.getView();
        var t = this;
        var select = me.getSelectionModel().getSelection();
        if(select.length ==0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.pcontractid_link = me.IdPcontract;

        var listIdProduct = [];
        for(var i =0 ;i<select.length;i++){
            var data = select[i].data;
            listIdProduct.push(data.id);
        }
        params.listIdProduct = listIdProduct;

        GSmartApp.Ajax.post('/api/v1/pcontractproduct/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình chọn sản phẩm',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    else {
                        var viewProduct = Ext.getCmp('PContractListProductView');
                        viewProduct.getStore().load();
                        me.up('window').close();
                    }
                }
            })
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('ProductStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ProductStore');

        var limit = me.down('#limitpage').getValue();
        var name = me.down('#name').getValue();
        var code = me.down('#code').getValue();
        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (name == null) {
            name = "";
        }

        if (code == null) {
            code = "";
        }

        store.loadStore_ByPage(1, limit, page, name, code);
    },
    onThemMoi: function (m, record) {
        var me = this.getView();
        var idProduct = 0;

        this.redirectTo("product/" + idProduct + "/edit");
    }
})