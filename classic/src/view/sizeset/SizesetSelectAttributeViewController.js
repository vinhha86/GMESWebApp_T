Ext.define('GSmartApp.view.sizeset.SizesetSelectAttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetSelectAttributeViewController',
    init: function () {
        let m = this;
        let me = this.getView();
        let store = this.getViewModel().getStore('AttributeValueStore');
        // store.loadStore(me.IdAttribute);
        store.loadStoreForSizeset(me.IdAttribute, me.IdSizeset, () => m.loadAttributeValueStore());
        // me.setStore(store);
        // setTimeout(function(){
        //     m.loadAttributeValueStore();
        // }, 150); 
        // m.loadAttributeValueStore();
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
        let me = this.getView();
        let params = new Object();
        params.sizesetid_link = me.IdSizeset;
        params.attributeid_link = me.IdAttribute;

        let obj = [];
        let select = me.getSelectionModel().getSelection();
        for (let i = 0; i < select.length; i++) {
            let data = select[i].data;
            obj.push(data.id);
        }

        params.listvalue = obj;
        params.msgtype = "SIZESET_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính dải size";

        GSmartApp.Ajax.post('/api/v1/sizesetattribute/createvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        mainView = Ext.getCmp('SizesetView');
                        mainView.getStore().load();

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
    onLuu: function () {
        let me = this.getView();
        let m = this;
        let viewmodel = this.getViewModel();
        m.Luu();
    },
    loadAttributeValueStore: function () {
        let me = this.getView();
        let params = new Object();
        params.attributeid_link = me.IdAttribute;
        params.sizesetid_link = me.IdSizeset;
        GSmartApp.Ajax.post('/api/v1/sizesetattribute/getvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        for (let i = 0; i < res.data.length; i++) {
                            let data = me.getStore().findRecord('id', res.data[i].id);
                            me.getSelectionModel().select(data, true);
                            // console.log(res.data[i].id);
                            // console.log(data);
                        }
                    }
                }
            })
    }
})