Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_detail_D_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_detail_D_ViewController',
    init: function () {
    },
    control: {
        '#btnThemMoi_NPL': {
            click: 'onThemMoiNPL'
        },
        '#btnCalculate': {
            click: 'onCalculate'
        }
    },
    onEdit: function (editor, context, e) {
        if (context.value == context.originalValue) return;

        var viewmodel = this.getViewModel();
        var params = new Object();
        var data = context.record.data;
        if (context.field != 'totalpackage') {
            if (data.unitid_link == 1) {
                data.totalyds = context.value * 1.09361;
            }
            else if (data.unitid_link == 3) {
                data.totalmet = context.value * 0.9144;
            }
        }
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/update_stockout_orderd', Ext.JSON.encode(params),
            function (success, response, options) {
                var store = viewmodel.getStore('Stockout_order_d_Store');
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        store.commitChanges();
                    }
                    else {
                        store.rejectChanges();
                    }
                }
            })
    },
    onMenu: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Chi tiết cây vải',
                    itemId: 'btnPackingList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-edit violetIcon',
                    handler: function () {
                        me.onShowPKL(record);
                    },
                },
                {
                    text: 'Xóa NPL',
                    itemId: 'btnDeleteDetail',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash violetIcon',
                    handler: function () {
                        me.onXoaDetail(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onXoaDetail: function (record) {
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.id = record.get('id');

        GSmartApp.Ajax.post('/api/v1/stockoutorder/delete_detail', Ext.JSON.encode(params),
            function (success, response, options) {
                var store = viewmodel.getStore('Stockout_order_d_Store');
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        store.remove(record);
                    }
                }
            })
    },
    onShowPKL: function (record) {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();

        if (viewmodel.get('order.id') == null) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải lưu phiếu trước khi chọn chi tiết cây vải!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var form = Ext.create('Ext.window.Window', {
                closable: false,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách cây vải',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height * .99,
                width: Ext.getBody().getViewSize().width * .95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Stockout_order_pkl_MainView',
                    viewModel: {
                        data: {
                            material_skuid_link: record.get('material_skuid_link'),
                            org_from_id_link: viewmodel.get('order.orgid_from_link'),
                            porderid_link: viewmodel.get('porderid_link'),
                            stockout_order_pkl: record.get('stockout_order_pkl'),
                            stockout_orderid_link: viewmodel.get('order.id'),
                            stockoutorderdid_link: record.get('id')
                        }
                    }
                }]
            });
            form.show();

            form.down('#Stockout_order_pkl_MainView').getController().on('Thoat', function (data) {
                form.close();
            });

            form.down('#Stockout_order_pkl_MainView').on('AddMat', function (data) {
                me.onAddMat(record, data);
            });

            form.down('Stockout_order_pkl_MainView').on('XoaPKL', function () {
                grid.up('Stockout_Detail_View').getController().getInfo(viewmodel.get('order.id'));
            })
        }
    },
    onAddMat: function (record, data) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.stockoutorderid_link = viewmodel.get('order.id');
        params.stockoutorderdid_link = record.get('id');
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/add_pkl', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        grid.up('Stockout_Detail_View').getController().getInfo(viewmodel.get('order.id'));
                    }
                }
            })
    },
    onCalculate: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        if (viewmodel.get('order.id') == null) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải lưu phiếu trước khi tính nhu cầu tự động!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            grid.setLoading('Đang tính dữ liệu');
            var params = new Object();
            params.id = viewmodel.get('order.id');

            GSmartApp.Ajax.post('/api/v1/stockoutorder/calculate', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var res = Ext.decode(response.responseText);
                        if (res.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Tính số lượng yêu cầu thành công!',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            grid.up('Stockout_Detail_View').getController().getInfo(params.id);
                        }
                    }
                })
        }
    },
    onThemMoiNPL: function () {
        var grid = this.getView();

        var viewmodel = this.getViewModel();

        if (viewmodel.get('order.id') == null) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải lưu phiếu trước khi thêm nguyên phụ liệu!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var type = viewmodel.get('order.stockouttypeid_link');

            var form = Ext.create('Ext.window.Window', {
                closable: false,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách NPL của lệnh sản xuất',
                closeAction: 'destroy',
                height: 600,
                width: 800,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'Warehouse_View',
                    viewModel: {
                        data: {
                            type_from: type == 1 ? 20 : 30,
                            type_to: type == 1 ? 29 : 59,
                            porderid_link: viewmodel.get('porderid_link')
                        }
                    }
                }]
            });
            form.show();

            form.down('#Warehouse_View').getController().on('Thoat', function () {
                form.close();
            });
            form.down('#Warehouse_View').getController().on('Chon', function (data) {
                var store = viewmodel.getStore('Stockout_order_d_Store');

                var check = false;

                for (var i = 0; i < data.length; i++) {
                    check = false;

                    for (var j = 0; j < store.data.length; j++) {
                        if (store.data.items[j].get('material_skuid_link') == data[i].get('materialid_link')) {
                            check = true;
                            break;
                        }
                    }
                    if (!check) {
                        var rec = new Object();
                        rec.id = null;
                        rec.material_skuid_link = data[i].get('materialid_link');
                        rec.colorid_link = data[i].get('colorid_link');
                        rec.unitid_link = data[i].get('unitid_link');

                        rec.materialCode = data[i].get('materialCode');
                        rec.materialName = data[i].get('materialName');
                        rec.tenMauNPL = data[i].get('tenMauNPL');
                        rec.coKho = data[i].get('coKho');
                        rec.unitName = data[i].get('unitName');
                        rec.totalyds = 0;

                        store.insert(0, rec);
                    }
                }

                var detail = grid.up('Stockout_Detail_View');
                detail.getController().onLuu();
                form.close();
            });
        }
    }
})