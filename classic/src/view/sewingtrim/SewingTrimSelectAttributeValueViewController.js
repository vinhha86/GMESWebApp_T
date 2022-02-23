Ext.define('GSmartApp.view.sewingtrim.SewingTrimSelectAttributeValueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SewingTrimSelectAttributeValueViewController',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.loadStore(me.IdAttribute);
        this.loadAttributeValueStore();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'Luu'
        },
        'SewingTrimSelectAttributeValueView' : {
            select: 'onSelectValue',
            beforedeselect : 'onDeselect'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onDeselect: function( grid, record, index, eOpts){
        if(record.data.isdefault) return false;
    },
    onSelectValue: function(grid, record, index, eOpts){
        var me = this.getView();

        if(record.data.isdefault){
            me.getSelectionModel().deselectAll();
            me.getSelectionModel().select(record, true, true);
        } else {
            if(me.IdAttribute == 4 || me.IdAttribute == 36) return;
            
            // var rec = grid.getStore().findRecord('isdefault', true);
            // me.getSelectionModel().deselect(rec);
        }

    },
    Luu: function () {
        var me = this.getView();
        var params = new Object();
        params.productid_link = me.IdProduct;
        params.attributeid_link = me.IdAttribute;

        var obj = [];
        var select = me.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listvalue = obj;
        params.msgtype = "PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm";

        GSmartApp.Ajax.post('/api/v1/productattribute/createvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('SewingTrimAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('SewingTrimSKUView');
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
    },
    loadAttributeValueStore: function () {
        var me = this.getView();
        var params = new Object();
        params.attributeid_link = me.IdAttribute;
        params.productid_link = me.IdProduct;
        GSmartApp.Ajax.post('/api/v1/productattribute/getvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            var data = me.getStore().findRecord('id', response.data[i].id);
                            me.getSelectionModel().select(data, true, true);
                        }
                    }
                }
            })
    }
})