Ext.define('GSmartApp.view.material.MaterialSelectAttribueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaterialSelectAttribueViewController',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeStore');
        store.loadStore_NotinProduct(me.IdProduct);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.productid_link = me.IdProduct;

        var obj = [];
        var select = me.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;
        params.msgtype = "PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm";

        GSmartApp.Ajax.post('/api/v1/productattribute/createatt', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('MaterialAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('MaterialSKUView');
                        SKUView.getStore().load();
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

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
    }
})