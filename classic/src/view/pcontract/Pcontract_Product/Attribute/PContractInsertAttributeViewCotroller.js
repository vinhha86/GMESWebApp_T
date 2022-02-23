Ext.define('GSmartApp.view.pcontract.PContractInsertAttributeViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInsertAttributeViewCotroller',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeStore');
        store.loadStore_NotinPContractProduct(me.IdPContract, me.IdProduct);
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
        var select = me.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn thuộc tính',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.productid_link = me.IdProduct;
        params.pcontractid_link = me.IdPContract;

        var obj = [];
        
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;
        params.msgtype = "PCONTRACT_PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm đơn hàng";

        GSmartApp.Ajax.post('/api/v1/pcontractattvalue/createattribute', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('PContractAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('PContractSKUView');
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