Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_list_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_list_ViewController',
    init: function () {
    },
    control: {
        '#btnThemMoi_Stockout_order_NL': {
            click: 'onThemMoiNL'
        },
        '#btnThemMoi_Stockout_order_PL': {
            click: 'onThemMoiPL'
        },
        'Stockout_order_list_View': {
            itemclick: 'onItemClick',
            itemdblclick: 'onEdit'
        }
    },
    onItemClick: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('order', record);
        var storeDetail = viewmodel.getStore('Stockout_order_d_Store');
        storeDetail.GetByStockoutOrder(record.get('id'));
    },
    onEdit: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất phụ liệu cho sản xuất',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .90,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            id: record.get('id'),
                            stockouttypeid_link: record.get('stockouttypeid_link'),
                            porderid_link: viewmodel.get('porderid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link')
                        },
                        porderid_link: viewmodel.get('porderid_link'),
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Stockout_Detail_View').getController().on('Save', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
        });
    },
    onUpdate: function (grid, rowIndex, colIndex, item, e, record) {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất phụ liệu cho sản xuất',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .90,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            id: record.get('id'),
                            stockouttypeid_link: record.get('stockouttypeid_link'),
                            porderid_link: viewmodel.get('porderid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link')
                        },
                        porderid_link: viewmodel.get('porderid_link'),
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Stockout_Detail_View').getController().on('Save', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
        });
    },
    onXoa: function (grid, rowIndex, colIndex, item, e, record) {
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa yêu cầu xuất NPL?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = record.get('id');

                    GSmartApp.Ajax.post('/api/v1/stockoutorder/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = grid.getStore();
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    store.removeAt(rowIndex);
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onThemMoiPL: function () {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất phụ liệu cho sản xuất',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .90,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            stockouttypeid_link: 2,
                            id: null,
                            porderid_link: viewmodel.get('porderid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link')
                        },
                        porderid_link: viewmodel.get('porderid_link'),
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
            form.close();
        });

        form.down('#Stockout_Detail_View').getController().on('Save', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
        });
    },
    onThemMoiNL: function () {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu yêu cầu xuất Nguyên liệu cho sản xuất',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .90,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Detail_View',
                viewModel: {
                    data: {
                        order: {
                            stockouttypeid_link: 1,
                            id: null,
                            porderid_link: viewmodel.get('porderid_link'),
                            pcontractid_link: viewmodel.get('pcontractid_link')
                        },
                        porderid_link: viewmodel.get('porderid_link'),
                        pcontractid_link: viewmodel.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockout_Detail_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Stockout_Detail_View').getController().on('Save', function () {
            var store = viewmodel.getStore('Stockout_order_Store');
            store.load();
        });
    }
})