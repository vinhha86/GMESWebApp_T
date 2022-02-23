Ext.define('GSmartApp.view.pcontract.PContractPairProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractPairProductViewCotroller',
    init: function () {
        // var me = this.getView();
        common.Check_Object_Permission();
    },
    control: {
        '#btnPair_PContractPairProductView': {
            click: 'onThemMoi'
        }
    },
    onThemMoi: function () {
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract').id;

        if (pcontractid_link == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo đơn hàng trước khi ghép bộ sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('PContractInfoView');
            viewInfo.down('#cust_contractcode').focus();
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách sản phẩm',
            closeAction: 'destroy',
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_Pair_insert_main',
                viewModel: {
                    data: {
                        pcontractid_link: pcontractid_link,
                        id: null
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_Pair_insert_main').on('Chon', function(){
            var store = viewmodel.getStore('PContractProductPairStore');
            store.load();
            form.close();
        })
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract').id;
        var productpairid_link = grid.getStore().getAt(rowIndex).get('productpairid_link');

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiêt bộ sản phẩm',
            closeAction: 'destroy',
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_Pair_insert_main',
                viewModel: {
                    data: {
                        pcontractid_link: pcontractid_link,
                        id: productpairid_link
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_Pair_insert_main').on('Chon', function(){
            var store = viewmodel.getStore('PContractProductPairStore');
            store.load();
            form.close();
        })
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa sản phẩm bộ "' + rec.data.productpairName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.data.id;

                    GSmartApp.Ajax.post('/api/v1/pcontractproductpairing/deleteproductpair', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
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
                                    grid.getStore().removeAt(rowIndex);
                                }
                            } else {
                                var response = Ext.decode(response.responseText);
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: response.message,
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
    onUpdate: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var mes = "";
        if (data.productpairCode == "" || data.productpairCode == null) {
            mes = "Bạn chưa nhập mã (Buyer) của bộ sản phẩm";
        }

        if (mes == "") {
            var params = new Object();
            params.id = data.productpairid_link;
            params.name = data.productpairName;
            params.code = data.productpairCode;
            params.vendorCode = data.productpairVendorCode;

            GSmartApp.Ajax.post('/api/v1/product/update_productpair', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        var store = viewmodel.getStore('PContractProductPairStore');
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            store.rejectChanges();
                        }
                        else {
                            store.commitChanges();
                        }
                    }
                })
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            context.record.set(context.field, context.originalValue);
        }

    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) {
        return common.Check_ActionColum_Permission(item.itemId);
    }
})