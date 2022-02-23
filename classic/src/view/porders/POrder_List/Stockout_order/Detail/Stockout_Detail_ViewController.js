Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_Detail_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Detail_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        
        console.log(viewmodel.get('porderid_link'));
        this.getInfo(viewmodel.get('order.id'));
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
        this.fireEvent('Thoat');
    },
    getInfo: function (id) {
        var me = this;
        var viewmodel = this.getViewModel();
        
        if (id != null) {
            var params = new Object();
            params.id = viewmodel.get('order.id');

            GSmartApp.Ajax.post('/api/v1/stockoutorder/getby_id', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var res = Ext.decode(response.responseText);
                        viewmodel.set('order', res.data);

                        var store = viewmodel.getStore('Stockout_order_d_Store');
                        store.removeAll();
                        store.insert(0, res.detail);

                        var store_amout = viewmodel.getStore('Stockout_order_color_amount_Store');
                        store_amout.removeAll();
                        store_amout.insert(0, res.color);

                        me.fireEvent('Reload');
                    }
                })
        }
        else {
            var detail = viewmodel.get('detail');
            if (detail != null) {
                var store = viewmodel.getStore('Stockout_order_d_Store');
                for (var i = 0; i < detail.length; i++) {
                    var rec = new Object({
                        materialCode: detail[i].get('mat_sku_code'),
                        material_skuid_link: detail[i].get('mat_skuid_link'),
                        stockoutorderid_link: null,
                        materialName: detail[i].get('mat_sku_name'),
                        tenMauNPL: detail[i].get('mat_sku_color_name'),
                        unitid_link: viewmodel.get('order.unitid_link'),
                        unitName: 'MÉT',
                        coKho: detail[i].get('mat_sku_size_name')
                    });
                    store.insert(0, rec);
                }
            }
        }
    },
    onLuu: function () {
        var me = this;
        var grid = this.getView();
        grid.setLoading('Đang lưu dữ liệu');

        var me = this;
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockout_order_d_Store');
        var params = new Object();
        var list_d = [];
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            list_d.push(data);
        }
        params.data = viewmodel.get('order');
        params.data.pcontractid_link = viewmodel.get('pcontractid_link');
        params.detail = list_d;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/create', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {

                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thông tin thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewmodel.set('order.id', res.id);
                        me.getInfo(res.id);
                        me.fireEvent('Save');
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})