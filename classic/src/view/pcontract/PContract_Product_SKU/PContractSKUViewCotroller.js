Ext.define('GSmartApp.view.pcontract.PContractSKUViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKUViewCotroller',
    init: function () {

    },
    control: {
        '#btnConfirmSKU': {
            click: 'onConfimSKU'
        },
        '#cmbSanPham': {
            select: 'onSelectSanPham'
        }
    },
    onSelectSanPham: function (combo, record, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        viewmodel.set('IdProduct', record.data.id);
        viewmodel.set('Product_pquantity', record.data.pquantity);

        storeSku.loadStoreByPO_and_Product(record.data.id, pcontract_poid_link);
    },
    onConfimSKU: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (viewmodel.get('IdProduct') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var params = new Object();
            params.pcontractid_link = viewmodel.get('PContract.id');
            params.productid_link = viewmodel.get('IdProduct');

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/comfim_sizebreakdown', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'OK'
                                },
                                fn: function () {
                                    me.fireEvent('ConfimSKU');
                                }
                            });
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'OK'
                            }
                        });
                    }
                })
        }
    },
    onSpecialkey: function (text, e, eOpts) {
        if (e.keyCode == 9) e.stopEvent();
    },
    onEdit: function (editor, context, e) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractSKUStore');

        if (grid.down('#btnThemSKU').hidden) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn không có quyền sửa thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'OK'
                }
            });
            store.rejectChanges();
        }
        else {
            if (context.value == context.originalValue) return;
            grid.setLoading("Đang xử lý");


            var data = context.record.data;
            var params = new Object();
            params.data = data;
            params.data.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
            if (context.field == "pquantity_porder")
                params.isupdte_amount = true;
            else
                params.isupdte_amount = false;

            delete params.data.listSKUvalue;

            GSmartApp.Ajax.post('/api/v1/pcontractsku/update', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Lưu thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Có'
                                }
                            });
                            store.rejectChanges();
                        }
                        else {
                            context.record.set('pquantity_production', response.amount);
                            store.commitChanges();

                            if (context.rowIdx < store.data.length - 1) {
                                var cellediting = grid.getPlugin('cellediting');
                                cellediting.startEditByPosition({
                                    row: (context.rowIdx + 1),
                                    column: context.colIdx
                                });
                            }
                        }
                    }
                })
        }
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var th = this;
        var grid = this.getView();

        if (grid.down('#btnThemSKU').hidden) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn không có quyền xóa',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'OK'
                }
            });
        }
        else {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn có chắc chắn muốn xóa SKU ?',
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        var viewmodel = th.getViewModel();
                        var record = grid.getStore().getAt(rowIndex);
                        var params = new Object();
                        params.pcontractid_link = viewmodel.get('PContract.id');
                        params.skuid_link = record.data.skuid_link;

                        GSmartApp.Ajax.post('/api/v1/pcontractsku/delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var response = Ext.decode(response.responseText);
                                    var store = viewmodel.getStore('PContractSKUStore');
                                    if (response.respcode == 200) {
                                        Ext.Msg.show({
                                            title: "Thông báo",
                                            msg: 'Xóa thành công',
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'OK'
                                            }
                                        });
                                        store.remove(record);

                                        var tab = Ext.getCmp('PContractProduct_Bom_TabColorView').getController();
                                        tab.createTab();

                                        var storeAtt = viewmodel.getStore('PContractAttValueStore');
                                        storeAtt.loadStore(params.pcontractid_link, viewmodel.get('IdProduct'));
                                    }
                                    else {
                                        Ext.Msg.show({
                                            title: "Thông báo",
                                            msg: 'Xóa thất bại',
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'OK'
                                            }
                                        });
                                    }
                                }
                            })
                    }
                }
            });
        }


    },
    onThemSKU: function () {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('IdProduct') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var form = Ext.create({
                xtype: 'skusearchwindow',
                reference: 'skusearchwindow',
                width: 800,
                height: 500,
                viewModel: {
                    data: {
                        sourceview: 'PContractSKU_ListProductView',
                        pcontractid_link: viewmodel.get('PContract.id'),
                        searchtype: 1,
                        orgcustomerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                        productid_link: viewmodel.get('IdProduct'),
                        productid_link_notsearch: viewmodel.get('IdProduct'),
                        type: 10,
                        pcontract_poid_link: viewmodel.get('pcontract_poid_link'),
                        isSearchViewHidden: true
                    }
                }
            });
            form.show();
        }

    },
    renderSum: function (value, summaryData, dataIndex) {
        var viewmodel = this.getViewModel();
        var Product_pquantity = viewmodel.get('Product_pquantity');
        if (null == Product_pquantity) Product_pquantity = 0;
        if (null == value) value = 0;
        if (Product_pquantity != value) {
            // viewmodel.set('isPorderReq_CheckOK', false);
            viewmodel.set('ProductSKUSummaryCssStyle', '<div style="color:red; font-weight: bold; align: right">');
        }
        else {
            // viewmodel.set('isPorderReq_CheckOK', true);
            viewmodel.set('ProductSKUSummaryCssStyle', '<div style="color:black; font-weight: bold; align: right">');
        }
        return viewmodel.get('ProductSKUSummaryCssStyle') + Ext.util.Format.number(value, '0,000') + '</div>';
    }
})