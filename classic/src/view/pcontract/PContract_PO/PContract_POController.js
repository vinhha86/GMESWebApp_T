Ext.define('GSmartApp.view.pcontract.PContract_POController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POController',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        'PContract_PO_ProductList': {
            itemclick: 'onSelectProduct'
        },
        // 'PContract_PO_List': {
        //     itemclick: 'onSelectPO'
        // },
        '#splbtn_Excel': {
            click: 'onExport'
        },
        '#splbtn_Upload': {
            click: 'onUpload'
        },
        '#fileUpload': {
            change: 'onSelect'
        },
        '#splbtn_Template': {
            click: 'onDownloadTemplate'
        }
    },
    onDownloadTemplate: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_chaogia', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_ChaoGia.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    },
    onUpload: function () {
        var me = this.getView();
        me.down('#fileUpload').fileInputEl.dom.click();
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/upload/offers', data, 3 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var storeProduct = viewmodel.getStore('PContractProductTreeStore');
                        storeProduct.load();
                        // var storePO = viewmodel.getStore('PContractProductPOStore');
                        // storePO.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                }
            })
    },
    onExport: function () {
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract.id');

        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var org_name = session.get('orgname');
        var date = common.getFormatDate(new Date());

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: org_name + '-Quotation-' + date,
            closeAction: 'destroy',
            height: 400,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'SelectPO_Quotation',
                viewModel: {
                    data: {
                        pcontractid_link: pcontractid_link
                    }
                }
            }]
        });
        form.show();
    },
    onFactoriesTap: function () {
        var panel_factories = this.getView().items.get('panel_factories');
        if (null != panel_factories) {
            if (panel_factories.getHidden())
                panel_factories.setHidden(false);
            else
                panel_factories.setHidden(true);
        }
    },
    onAddPOTap: function () {
        var viewModel = this.getViewModel();
        var obj_copy = viewModel.get('obj_copy');
        if (viewModel.get('productpairid_link') == 0) {
            Ext.Msg.show({
                title: 'Đơn hàng',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            //Kiem tra xem co phai san pham con ko
            if (viewModel.get('isproductleaf')) {
                Ext.Msg.show({
                    title: 'Đơn hàng',
                    msg: 'Không được thêm đơn hàng cho sản phẩm con',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                var form = Ext.create('Ext.window.Window', {
                    closable: true,
                    resizable: false,
                    modal: true,
                    border: false,
                    title: 'Đơn hàng (PO)',
                    closeAction: 'destroy',
                    height: Ext.getBody().getViewSize().height * .99,
                    width: Ext.getBody().getViewSize().width * .95,
                    bodyStyle: 'background-color: transparent',
                    layout: {
                        type: 'fit', // fit screen for window
                        padding: 5
                    },
                    items: [{
                        xtype: 'PContract_PO_Edit',
                        viewModel: {
                            data: {
                                id: null,
                                productpairid_link: viewModel.get('productpairid_link'),
                                isproductpair: viewModel.get('isproductpair'),
                                pcontractid_link: viewModel.get('PContract.id'),
                                obj_copy: obj_copy, // copy paste po info o sua chao gia,
                                obj_paste_btn_hidden: false,
                                obj_copy_btn_hidden: false,
                                po: {
                                    po_typeid_link: 0
                                },
                                hiddenBtnLuuAdd: false
                            }
                        }
                    }]
                });
                form.show();

                form.down('PContract_PO_Edit').getController().on('Thoat', function () {
                    var storePO = viewModel.getStore('PContractProductPOStore');
                    storePO.load();
                    form.close();
                });
            }
        }


    },
    onSelectProduct: function (m, rec) {
        // console.log(rec);
        var viewModel = this.getViewModel();
        viewModel.set('productpairid_link', rec.data.productid_link);
        if (rec.data.children.length > 0)
            viewModel.set('isproductpair', 1);
        else
            viewModel.set('isproductpair', 0);

        if (rec.data.parent_id > 0)
            viewModel.set('isproductleaf', true);
        else
            viewModel.set('isproductleaf', false);
        // var storePO = Ext.data.StoreManager.lookup('PContract_PO'); 
        var storePO = viewModel.getStore('PContractProductPOStore');
        storePO.loadStoreByType(viewModel.get('PContract.id'), viewModel.get('productpairid_link'), 0);
    },
    onSelectPO: function (m, rec) {
        var viewModel = this.getViewModel();

        var POShippingStore = viewModel.getStore('POShippingStore');
        POShippingStore.loadStore_bypo(rec.data.id);
    },
    onPOPriceEdit: function (rec) {
        // var rec = grid.getStore().getAt(rowIndex);
        var viewModel = this.getViewModel();
        var obj_copy = viewModel.get('obj_copy');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Đơn hàng - Chào giá',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        productpairid_link: viewModel.get('productpairid_link'),
                        isproductpair: viewModel.get('isproductpair'),
                        pcontractid_link: viewModel.get('PContract.id'),
                        obj_copy: obj_copy, // copy paste po info o sua chao gia
                        obj_paste_btn_hidden: true,
                        obj_copy_btn_hidden: false,
                    }
                }
            }]
        });
        form.show();

        form.down('PContract_PO_Edit').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractProductPOStore');
            if (null != storePO) storePO.load();
            form.close();
        });
        form.down('#PContract_PO_Edit').getController().on('CopyPoInfo', function (obj_copy_from_event) {
            viewModel.set('obj_copy', obj_copy_from_event)
        })
    },
    onCancel_PO: function (rec) {
        var params = new Object();
        var viewmodel = this.getViewModel();
        params.pcontract_poid_link = rec.get('id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/check_cancel', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                var mes = response.mes;
                if (mes == null || mes == "") {
                    mes = "Bạn có chắc chắn muốn hủy PO?"
                }

                Ext.Msg.confirm('Đơn hàng', mes,
                    function (choice) {
                        if (choice === 'yes') {
                            GSmartApp.Ajax.post('/api/v1/pcontract_po/cancel_po', Ext.JSON.encode(params),
                                function (success, response, options) {
                                    var response = Ext.decode(response.responseText);
                                    if (success) {
                                        var storePO = viewmodel.getStore('PContractProductPOStore');
                                        storePO.load();
                                    } else {
                                        Ext.MessageBox.show({
                                            title: "Chào giá",
                                            msg: response.message,
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'Đóng',
                                            }
                                        });
                                    }
                                });
                        }
                    });
            });
    },
    onAccept: function (rec) {
        // var rec = grid.getStore().getAt(rowIndex);
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 320,
            closable: true,
            title: 'Chốt đơn hàng (PO)',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'PContract_PO_FormAccept',
                viewModel: {
                    data: {
                        po: {
                            po_quantity: rec.get('po_quantity'),
                            po_buyer: rec.get('po_buyer'),
                            po_vendor: rec.get('po_vendor'),
                            shipdate: rec.get('shipdate'),
                            id: rec.get('id'),
                            orgbuyerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                            orgid_link: rec.get('orgmerchandiseid_link'),
                            userid_link: rec.get('merchandiserid_link'),
                            po_quantity: rec.get('po_quantity'),
                            amount_org: rec.get('amount_org')
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_FormAccept').getController().on('AcceptSuccess', function () {
            var store = viewmodel.getStore('PContractProductPOStore');
            store.load();
            form.close();
        })
    },
    onXoa: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Chào giá? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractProductPOStore = viewmodel.getStore('PContractProductPOStore');
                    var params = new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                PContractProductPOStore.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Chào giá",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });
                }
            });
    },
    onAdd_SubPO: function (rec) {
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin đơn hàng',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    type: 'PContract_PO_Edit_Info_Main_ViewModel',
                    data: {
                        id: null,
                        parentpoid_link: rec.data.id,
                        productpairid_link: rec.get('productid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractProductPOStore');
            storePO.load();
            form.close();
        })
    },
    onAdd_Shipping: function (rec) {
        var viewModel = this.getViewModel();
        if (rec.data.sub_po.length > 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không được thêm kế hoạch giao hàng cho PO cha',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        } else {
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Kế hoạch giao hàng',
                closeAction: 'destroy',
                height: 400,
                width: 700,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'PContract_PO_Shipping_Main',
                    viewModel: {
                        data: {
                            id: null,
                            pcontract_poid_link: rec.data.id,
                        }
                    }
                }]
            });
            form.show();
        }

    },
    onEdit_Shipping: function (rec) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch giao hàng',
            closeAction: 'destroy',
            height: 400,
            width: 700,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Shipping_Main',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        pcontract_poid_link: rec.data.pcontract_poid_link,
                    }
                }
            }]
        });
        form.show();

    },
    onDelete_Shipping: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Kế hoạch giao hàng', 'Bạn có thực sự muốn xóa kế hoạch giao hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var POShippingStore = viewmodel.getStore('POShippingStore');
                    var params = new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/po_shipping/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                POShippingStore.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Kế hoạch giao hàng",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });
                }
            });
    },
    onPOInfoEdit: function (rec) {
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin đơn hàng',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        isedit: true
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractProductPOStore');
            storePO.load();
            form.close();
        })
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa chào giá',
                    itemId: 'btnEditPrice_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-dollar brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onPOPriceEdit(record);
                    },
                },
                {
                    text: 'Thêm line giao hàng',
                    itemId: 'btnAdd_line_children',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onAddPOLine(record);
                    },
                },
                {
                    text: 'Xóa chào giá',
                    itemId: 'btnDeletePO_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoa(record);
                    }
                },
                {
                    text: 'Chốt chào giá -> Lập PO',
                    itemId: 'btnConfirmPO_PContract_PO_List',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-check violetIcon',
                    // hidden: ishidden_accept,
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onAccept(record);
                    }
                },
                {
                    text: 'Xóa Kế hoạch sản xuất',
                    itemId: 'btnDeletePOrder_req',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-undo redIcon',
                    hidden: record.get('status') >= 0 ? true : false,
                    handler: function () {
                        me.onDel_KHSX(record);
                    }
                },
                {
                    text: 'Hủy chốt chào giá',
                    itemId: 'btnCancelOffer',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-undo redIcon',
                    hidden: record.get('status') >= 0 ? false : true,
                    handler: function () {
                        me.onCancelOffer(record);
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
    onMenu_SubPO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Sửa line giao hàng',
                    itemId: 'btnEditPrice_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-dollar brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onPOLineEdit(record);
                    },
                },
                {
                    text: 'Xóa Line giao hàng',
                    itemId: 'btnPausePO_PContract_PO_List',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-ban violetIcon',
                    // hidden: ishidden_accept,
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoaPOLine(record);
                    }
                },
                '-',
                {
                    text: 'Copy Line giao hàng',
                    itemId: 'btnCopyPO_PContract_PO_List',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-copy violetIcon',
                    // hidden: ishidden_accept,
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onCopyLine(record);
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
    onCancelOffer: function (rec) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontract_poid_link = rec.get('id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/cancel_po_offer', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractProductPOStore');
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Hủy thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.load();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Hủy thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Hủy thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
    },
    onDel_KHSX: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa kế hoạch sản xuất của chào giá? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store = viewmodel.getStore('PContractProductPOStore');
                    var params = new Object();
                    params.pcontract_poid_link = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete_plan_porder', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                    store.load();
                                }
                                else {
                                    Ext.MessageBox.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                            } else {
                                Ext.MessageBox.show({
                                    title: "Kế hoạch giao hàng",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });
                }
            });
    },
    onCopyLine: function (rec) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontract_poid_Link = rec.get('id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/copyline', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    var store = viewmodel.getStore('PContractProductPOStore');
                    store.load();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
    },
    onXoaPOLine: function (rec) {
        console.log(rec);
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Line giao hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store = viewmodel.getStore('PContractProductPOStore');
                    var params = new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                store.load();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Kế hoạch giao hàng",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });
                }
            });
    },
    onPOLineEdit: function (rec, isHidden_req) {
        var viewModel = this.getViewModel();

        var list_plan_productivity = [];
        list_plan_productivity = rec.get('pcontract_po_productivity');
        var plan_productivity = new Object();
        for (var i = 0; i < list_plan_productivity.length; i++) {
            if (list_plan_productivity[i].productid_link == rec.get('productid_link')) {
                plan_productivity = list_plan_productivity[i];
                break;
            }
        }

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin Line giao hàng',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    type: 'PContract_PO_Edit_Info_Main_ViewModel',
                    data: {
                        id: rec.data.id,
                        isedit: true,
                        productpairid_link: rec.get('productid_link'),
                        product_selected_id_link: rec.get('productid_link'),
                        productid_link: rec.get('productid_link'),
                        isHidden_req: isHidden_req == null ? false : true,
                        po: {
                            po_typeid_link: 10,
                            po_buyer: rec.get('po_buyer'),
                            po_vendor: rec.get('po_vendor'),
                            matdate: rec.get('matdate'),
                            pcontract_po_productivity: rec.get('pcontract_po_productivity'),
                            parentpoid_link: rec.get('id'),
                            id: null,
                            pcontractid_link: rec.get('pcontractid_link'),
                            productid_link: rec.get('productid_link'),
                            status: rec.get('status'),
                            productiondate: rec.get('productiondate')
                        },
                        pcontract_po_productivity: plan_productivity,
                        pcontractid_link: rec.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractProductPOStore');
            storePO.load();
            form.close();
        });
    },
    onAddPOLine: function (rec, isHidden_req) {
        var me = this;

        var list_plan_productivity = [];
        list_plan_productivity = rec.get('pcontract_po_productivity');
        var plan_productivity = new Object();
        for (var i = 0; i < list_plan_productivity.length; i++) {
            list_plan_productivity[i].id = null;
            if (list_plan_productivity[i].productid_link == rec.get('productid_link')) {
                plan_productivity = list_plan_productivity[i];
            }
        }

        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới Line giao hàng',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    type: 'PContract_PO_Edit_Info_Main_ViewModel',
                    data: {
                        id: null,
                        isedit: true,
                        productpairid_link: rec.get('productid_link'),
                        product_selected_id_link: rec.get('productid_link'),
                        productid_link: rec.get('productid_link'),
                        isHidden_req: isHidden_req == null ? false : true,
                        po: {
                            po_typeid_link: 10,
                            po_buyer: rec.get('po_buyer'),
                            po_vendor: rec.get('po_vendor'),
                            matdate: rec.get('matdate'),
                            pcontract_po_productivity: rec.get('pcontract_po_productivity'),
                            parentpoid_link: rec.get('id'),
                            id: null,
                            pcontractid_link: rec.get('pcontractid_link'),
                            productid_link: rec.get('productid_link'),
                            status: rec.get('status'),
                            productiondate: rec.get('productiondate'),
                            packingnotice: rec.get('packingnotice'),
                            shipmodeid_link: rec.get('shipmodeid_link'),
                            sewtarget_percent: rec.get('sewtarget_percent'),
                            shipdate: rec.get('shipdate'),
                            portfromid_link: rec.get('portfromid_link'),
                            porttoid_link: rec.get('porttoid_link'),
                            is_tbd: rec.get('is_tbd'),
                            productiondays: rec.get('productiondays'),
                            productiondate: rec.get('productiondate'),
                            packingnotice: rec.get('packingnotice'),
                            comment: rec.get('comment'),
                            portfromid_link: rec.get('portfromid_link'),
                            porttoid_link: rec.get('porttoid_link')
                        },
                        pcontract_po_productivity: plan_productivity,
                        width_PContract_PO_Edit_Porder_Req: 270,
                        ishidden_luu_linegiaohang: false,
                        pcontractid_link: rec.get('pcontractid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractProductPOStore');
            storePO.load();
            form.close();
        })
    },
    onMenu_Shipping: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Sửa kế hoạch',
                    itemId: 'btnEditShipping_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil greenIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onEdit_Shipping(record);
                    }
                },
                {
                    text: 'Xóa kế hoạch',
                    itemId: 'btnDeleteShipping_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onDelete_Shipping(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },
    onStyleCodeFilterKeyup: function () {
        var filterField = this.lookupReference('styleCodeFilter'),
            PContract_PO_ProductList = Ext.getCmp('PContract_PO_ProductList');
        store = PContract_PO_ProductList.getStore(),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onTextFilterKeyup: function () {
        var filterField = this.lookupReference('textFilter'),
            PContract_PO_ProductList = Ext.getCmp('PContract_PO_ProductList');
        store = PContract_PO_ProductList.getStore(),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.textFilter = filters.add({
                id: 'textFilter',
                property: 'info',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.textFilter) {
            filters.remove(this.textFilter);
            this.textFilter = null;
        }
    },
    onSelectOffer: function (rowNode, record, expandRow, eOpts) {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var params = new Object();
        params.pcontract_poid_link = record.get('id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/get_poline_by_offer', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    grid.setLoading(false);
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        record.set('sub_po_plan', response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    }
});

