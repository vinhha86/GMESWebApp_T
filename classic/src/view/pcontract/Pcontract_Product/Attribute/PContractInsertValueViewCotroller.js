Ext.define('GSmartApp.view.pcontract.PContractInsertValueViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInsertValueViewCotroller',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.loadStore(me.IdAttribute);
        this.loadStore_NotinPContractProduct();
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
    Luu: function () {
        var me = this.getView();
        var params = new Object();
        params.productid_link = me.IdProduct;
        params.attributeid_link = me.IdAttribute;

        var Add = [];
        var select = me.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            Add.push(data.id);
        }

        params.listAdd = Add;
        params.pcontractid_link = me.IdPContract;
        params.productid_link = me.IdProduct;
        params.attributeid_link = me.IdAttribute;

        params.msgtype = "PCONTRACT_PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm đơn hàng";

        GSmartApp.Ajax.post('/api/v1/pcontractattvalue/createattributevalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('PContractAttributeView');
                        mainView.getStore().loadStore(me.IdPContract, me.IdProduct);

                        SKUView = Ext.getCmp('PContractSKUView');
                        SKUView.getController().getViewModel().getStore('PContractSKUStore').load();

                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: null,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onLuu: function () {
        var me = this.getView();
        var m = this;
        var viewmodel = this.getViewModel();

        if (me.IdAttribute == 4 || me.IdAttribute == 30) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Thay đổi giá trị thuộc tính của màu , cỡ sản phẩm sẽ thay đổi đến mã SKU của sản phẩm ',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'no') {
                        me.up('window').close();
                    }
                    else {
                        m.Luu();
                    }
                }
            });
        }else{
            m.Luu();
        }
    },
    loadStore_NotinPContractProduct: function(){
        var me = this.getView();
        var params = new Object();
        params.attributeid_link = me.IdAttribute;
        params.productid_link = me.IdProduct;
        params.pcontractid_link = me.IdPContract;

        GSmartApp.Ajax.post('/api/v1/pcontractattvalue/getvaluebyproduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            var data = me.getStore().findRecord('id', response.data[i].attributevalueid_link);
                            me.getSelectionModel().select(data, true);
                        }
                    }
                }
            })
    }
})