Ext.define('GSmartApp.view.pcontract.PContractProductBomViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductBomViewController',
    init: function () {

    },
    control: {
        '#actXoa': {
            click: 'onXoa'
        },
        '#btnNPL': {
            click: 'onThemNPL'
        },
        '#cmbSanPham': {
            change: 'onChangeProduct'
        }
    },
    onChangeProduct: function (combo, newValue, oldValue, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeBOM = this.getView().getStore();
        var pcontractid_link = viewmodel.get('PContract').id;
        var productid_link = viewmodel.get('IdProduct');

        storeBOM.loadStore(pcontractid_link, productid_link);

        var data = combo.findRecord('productid_link', newValue);

        var productview = Ext.getCmp('PContractListProductView');
        productview.getSelectionModel().select(data);
    },
    onThemNPL: function (m) {
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');

        if (productid_link == 0) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    me.down('#cmbSanPham').expand();
                }
            });
            return;
        }

        var form = Ext.create({
            xtype: 'skusearchwindow',
            reference: 'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContractProductBomView',
                    searchtype: 5,
                    pcontractid_link: viewmodel.get('PContract.id'),
                    productid_link_notsearch: productid_link
                }
            }
        });
        form.show();
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nguyên phụ liệu "' + rec.data.materialName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'no') {
                    return;
                }
                else {
                    var params = new Object();
                    params.pcontractid_link = viewmodel.get('PContract').id;
                    params.productid_link = viewmodel.get('IdProduct');
                    params.materialid_link = rec.data.materialid_link;

                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom/deletematerial', Ext.JSON.encode(params),
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
                                    var storebom = viewmodel.getStore('PContractBomColorStore');
                                    storebom.load();
                                }
                            }
                        })
                }
            }
        });
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.isUpdateBOM = false;

        viewmodel.set('isReadOnlycmbSanPham', true);
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                    else {
                        var storebom = viewmodel.getStore('PContractProductBom2Store');
                        storebom.commitChanges();

                        var tab = Ext.getCmp('PContractProduct_Bom2_TabColorView');
                        if (tab.items.length > 0) {
                            var storebomcolor = viewmodel.getStore('PContractBom2ColorStore');
                            storebomcolor.load();
                        }

                    }
                }

                viewmodel.set('isReadOnlycmbSanPham', false);
            })
    }
})