Ext.define('GSmartApp.view.RFID.demoRFID.stock.stockout.StockoutViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockoutViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var deviceStore = viewmodel.getStore('device_store');
        deviceStore.loadStore();
    },
    control: {
        '#btnStart': {
            click: 'onStart'
        },
        '#btnStop': {
            click: 'onStop'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onLuu: function () {
        var me = this.getView();

        var viewmodel = this.getViewModel();
        var id_invstore = viewmodel.get('id_invstore');

        if (id_invstore == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn kho",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            me.setLoading('Đang nhập kho');
            var lst = [];
            var store = viewmodel.getStore('StockoutStore');
            for (var i = 0; i < store.data.length; i++) {
                var data = store.data.items[i].data;
                lst.push(data);
            }

            var params = new Object();
            params.data = lst;
            params.store_id = id_invstore;

            var url = '  ';

            GSmartApp.Ajax.post_demo(url, Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Lưu thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                            store.removeAll();
                        }
                    }
                })
        }
    },
    onStart: function () {
        var viewmodel = this.getViewModel();
        var deviceid = viewmodel.get('deviceid');
        var id_invstore = viewmodel.get('id_invstore');

        if (deviceid == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thiết bị",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else if (id_invstore == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn kho",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            viewmodel.set('isStart', true);

            var store = viewmodel.getStore('StockoutStore');
            store.LoadPickingList(id_invstore);
        }

    },
    onStop: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isStart', false);
    }
})