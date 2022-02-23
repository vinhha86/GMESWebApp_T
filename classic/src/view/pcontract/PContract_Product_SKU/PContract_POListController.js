Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    control: {
        '#fileUploadPO': {
            change: 'onSelect'
        },
        '#productFilter': {
            select: 'onFilterProduct',
            change: 'onChangeProduct'
        },
        '#PO_ChildList': {
            itemclick: 'onSelectPO'
        },
        '#PContract_POList': {
            itemclick: 'onSelectParentPO'
        },
        '#btnUploadTemplate': {
            click: 'onDownloadTemplate'
        },
        '#btnUploadTemplateFOB': {
            click: 'onDownloadTemplateFOB'
        },
        '#cmbFilterMauSP': {
            select: 'onFilterMauSP'
        }
    },
    onFilterMauSP: function (cmb, record, e) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        store.load();
    },
    onClearFilter: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('id_mausanpham_filter', 0);
        var store = viewmodel.getStore('PContractPOList');
        store.load();
    },
    onSelectOffer: function (rowNode, record, expandRow, eOpts) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        viewmodel.set('po_selection', record);

        grid.setLoading('Đang tải dữ liệu');

        var params = new Object();
        params.pcontract_poid_link = record.get('id');
        params.mausanphamid_link = viewmodel.get('id_mausanpham_filter');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/getPOLine_Confirm', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        record.set('sub_po_confirm', response.data);
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
    onRender_poquantity: function (value, metaData, record, rowIdx, colIdx, stor) {
        var viewmodel = this.getViewModel();
        metaData.tdCls = 'po_linekh';
        var cls = viewmodel.get('clspoquantity');
        // if (!record.data.checkamount)
        //     cls = '<div style="color:red; font-weight: bold; align: right">';
        return value == 0 ? "" : cls + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onSPFilterKeyup: function () {
        var filterField = this.lookupReference('MaSPFilter'),
            PContract_POList = this.getView();
        store = PContract_POList.getStore(),
            filters = store.getFilters();

        if (filterField.value) {
            this.spFilter = filters.add({
                id: 'spFilter',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.spFilter) {
            filters.remove(this.spFilter);
            this.spFilter = null;
        }
    },
    onPOFilterKeyup: function () {
        var filterField = this.lookupReference('POFilter'),
            PContract_POList = this.getView();
        store = PContract_POList.getStore(),
            filters = store.getFilters();

        if (filterField.value) {
            this.POFilter = filters.add({
                id: 'POFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POFilter) {
            filters.remove(this.POFilter);
            this.POFilter = null;
        }
    },
    onPOChilFilterKeyup: function (text, e, eOpts) {
        var filterField = this.lookupReference('POFilterChil'),
            PContract_POList = text.up('gridpanel');
        store = PContract_POList.getStore(),
            filters = store.getFilters();

        if (filterField.value) {
            this.POFilterChil = filters.add({
                id: 'POFilterChil',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POFilterChil) {
            filters.remove(this.POFilterChil);
            this.POFilterChil = null;
        }
    },
    onXoaPOLine: function (record, rowIndex) {
        var grid = this.getView();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách PO Line',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ListPO_ConfimView',
                viewModel: {
                    data: {
                        pcontract_poid_link: record.get('id')
                    }
                }
            }]
        });
        form.show();

        form.down('#ListPO_ConfimView').on('XoaThanhCong', function () {
            form.close();
            var widget = grid.getPlugin('rowwidget');
            widget.toggleRow(rowIndex, record);
        })
    },
    onDownloadTemplateFOB: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_po_fob', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Upload_PO_Line_FOB.xlsx", response.data);
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
    onDownloadTemplate: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_po', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Upload_PO_Line.xlsx", response.data);
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
    onFilterProduct: function (combo, record, eOpts) {
        // console.log(record);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = viewmodel.get('PContract.id');

        store.loadAccept_ByContract(pcontractid_link, productid_link);
    },
    onChangeProduct: function (m, newValue, oldValue) {
        if (newValue == "" || newValue == null) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');

            var pcontractid_link = viewmodel.get('PContract.id');

            store.loadAccept_ByContract(pcontractid_link, 0);
        }

    },
    onUpload: function (record, rowIndex, type) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontract_po_parentid_link', record.get('id'));
        viewmodel.set('record_upload', record);
        viewmodel.set('index_upload', rowIndex);
        viewmodel.set('type_upload', type);
        var me = this.getView();
        me.down('#fileUploadPO').fileInputEl.dom.click();
    },
    onUpload_FOB: function (record, rowIndex, type) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontract_po_parentid_link', record.get('id'));
        viewmodel.set('record_upload', record);
        viewmodel.set('index_upload', rowIndex);
        viewmodel.set('type_upload', type);
        var me = this.getView();
        me.down('#fileUploadPO').fileInputEl.dom.click();
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('parentid_link', viewmodel.get('pcontract_po_parentid_link'));
        var url = '/api/v1/pcontract_po/upload_po';

        if (viewmodel.get('type_upload') == "FOB") {
            url = '/api/v1/upload/upload_po_fob';
        }

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout(url, data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải PO",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    // reload store
                    var PContractPOList = viewmodel.getStore('PContractPOList');
                    PContractPOList.reload();
                    // 
                    // var rowIndex = viewmodel.get('index_upload');
                    // var record = viewmodel.get('record_upload');

                    // var widget = grid.getPlugin('rowwidget');
                    // widget.toggleRow(rowIndex, record);
                }
            })
    },
    onSelectParentPO: function (m, rec) {
        var viewModel = this.getViewModel();
        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.removeAll();
        var storeSku = viewModel.getStore('PContractSKUStore');
        storeSku.removeAll();
        var skuView = Ext.getCmp('PContractSKUView');
        var cmbSanPham = skuView.down('#cmbSanPham');
        cmbSanPham.clearValue();
        viewModel.set('isDisable_btnThemSKU', true);
        viewModel.set('isDisable_btnConfirmSKU', true);
    },
    onSelectPO: function (m, rec) {
        var grid = this.getView();

        var viewModel = this.getViewModel();
        viewModel.set('isDisable_btnThemSKU', false);
        viewModel.set('isDisable_btnConfirmSKU', false);
        viewModel.set('pcontract_poid_link', rec.data.id);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        var pcontractid_link = viewModel.get('PContract.id');
        productStore.loadStore_bypairid_Async(productid_link, rec.data.po_quantity, true, pcontractid_link);
        productStore.load({
            scope: this,
            callback: function (records, operation, success) {

                var record = productStore.getAt(0);
                var skuView = Ext.getCmp('PContractSKUView');
                var cmbSanPham = skuView.down('#cmbSanPham');
                cmbSanPham.select(record);
                viewModel.set('IdProduct', record.get('id'));
                viewModel.set('Product_pquantity', record.data.pquantity);
                // console.log(record);
                //clear sku list
                var storeSku = viewModel.getStore('PContractSKUStore');
                storeSku.removeAll();
                storeSku.loadStoreByPO_and_Product(record.get('id'), rec.data.id);
            }
        });
    },
    onThemPO: function (rec) {
        var data = rec.get('pcontract_po_productivity');
        for (var i = 0; i < data.length; i++) {
            data[i].id = null;
        }

        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới PO',
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
                        po: {
                            pcontractid_link: viewmodel.get('PContract.id'),
                            parentpoid_link: rec == null ? 0 : rec.data.id,
                            po_typeid_link: 11,
                            pcontract_po_productivity: data,
                            productid_link: rec.data.productid_link
                        },
                        isedit: true,
                        productpairid_link: rec.get('productid_link'),
                        productid_link: rec.get('productid_link'),
                        pcontract_po_productivity: {
                            plan_productivity: data[0].plan_productivity,
                            amount: data[0].amount,
                            plan_linerequired: data[0].plan_linerequired,
                            pairamount: data[0].pairamount
                        },
                        width_PContract_PO_Edit_Porder_Req: 0,
                        pcontractid_link: viewmodel.get('PContract.id')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('LuuThanhCong', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.load();
        });

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            form.close();
        })
    },
    onXoaPO: function (rec) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        if (rec.get('ismap')) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Line đã được đồng bộ với kế hoạch sản xuất! Bạn phải hùy đồng bộ để xóa đc Line",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Đơn hàng? chọn YES để thực hiện',
                function (choice) {
                    if (choice === 'yes') {
                        var PContractPOList = viewmodel.getStore('PContractPOList');
                        var params = new Object();
                        params.id = rec.data.id;
                        GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                var response = Ext.decode(response.responseText);
                                if (success) {
                                    PContractPOList.reload();
                                    var skuStore = viewmodel.getStore('PContractSKUStore');
                                    skuStore.removeAll();
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
        }
    },
    onEdit: function (rec, isHidden_req) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin PO',
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
                        isHidden_req: isHidden_req == null ? false : true,
                        productid_link: rec.get('productid_link'),
                        width_PContract_PO_Edit_Porder_Req: 0,
                        pcontractid_link: viewModel.get('PContract.id')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#PContract_PO_Edit_Info_Main').getController().on('LuuThanhCong', function () {
            var storePO = viewModel.getStore('PContractPOList');
            storePO.load();
        })
    },
    onFOBPO: function (rec) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin FOB',
            closeAction: 'destroy',
            height: 400,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'FOBPricePODetail',
                viewModel: {
                    data: {
                        record: rec
                    }
                }
            }]
        });
        form.show();
    },
    onShowBalance: function (rec) {

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Bảng cân đối NPL',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Balance_Main',
                viewModel: {
                    data: {
                        pcontractid_link: rec.data.pcontractid_link,
                        pcontract_poid_link: rec.data.id
                    }
                }
            }]
        });
        form.show();
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa PO',
                    itemId: 'btnEditPO_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil brownIcon',
                    handler: function () {
                        me.onEdit(record, true);
                    },
                }, {
                    text: 'Xóa PO',
                    itemId: 'btnDelPO_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        me.onXoaPO(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onMenu_PO_Parent: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var viewmodel = this.getViewModel();
        var type = viewmodel.get('PContract.contracttypeid_link');

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa PO',
                    itemId: 'btnEditPO_Parent_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil brownIcon',
                    handler: function () {
                        me.onEdit(record);
                    },
                },
                {
                    text: 'Chi tiết FOB',
                    itemId: 'btnDetailFOB_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-book greenIcon',
                    handler: function () {
                        me.onFOBPO(record.data);
                    }
                },
                {
                    text: 'Đổi Merchandiser phụ trách',
                    itemId: 'btnChange_Merchandiser',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-user greenIcon',
                    handler: function () {
                        me.onChangeMer(record);
                    }
                },
                '-',
                {
                    text: 'Thêm PO Line',
                    itemId: 'btnInsert_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        me.onThemPO(record);
                    }
                },
                {
                    text: 'Upload File PO Line(Excel)',
                    itemId: 'btnUpload_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-upload brownIcon',
                    handler: function () {
                        if (record.get('po_buyer') == 'TBD') {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Bạn không được upload cho PO có mã TBD! Bạn phải cập nhật số PO trước khi upload",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                        else {
                            me.onUpload(record, rowIndex, "CM");
                        }
                    },
                    // hidden: type == 1 ? false : true
                },
                {
                    text: 'Upload File PO Line FOB(Excel)',
                    itemId: 'btnUpload_PO_FOB',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-upload brownIcon',
                    handler: function () {
                        if (record.get('po_buyer') == 'TBD') {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Bạn không được upload cho PO có mã TBD! Bạn phải cập nhật số PO trước khi upload",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                        else {
                            me.onUpload(record, rowIndex, "FOB");
                        }
                    },
                    hidden: true
                },
                {
                    text: 'Xóa PO Line',
                    itemId: 'btnDelPO_PContract_POListChil',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        me.onXoaPOLine(record, rowIndex);
                    }
                },
                '-',
                {
                    text: 'Bảng cân đối NPL',
                    itemId: 'btnBalance',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale blueIcon',
                    handler: function () {
                        me.onShowBalance(record);
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onChangeMer: function (rec) {
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 320,
            closable: true,
            title: 'Thay đổi Merchandiser',
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
            form.close();
        })
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderShipping: function (val, metaData, record, rindex, cindex, store) {
        metaData.tdCls = 'po_linekh';
        if (null != val) {
            var viewmodel = this.getViewModel();
            var ShipModeStore = viewmodel.getStore('ShipModeStore');
            if (null != ShipModeStore) {
                var objUnit = ShipModeStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.name;
            }
        }
    },
    onPOListEdit: function (editor, e) {
        var viewModel = this.getViewModel();
        if (e.originalValue != e.value) {
            e.record.data[e.field] = e.value;
            var params = new Object();
            params.data = e.record.data;
            GSmartApp.Ajax.post('/api/v1/pcontract_po/update', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        e.record.commit();
                        var PContractPOList = viewModel.getStore('PContractPOList');
                        PContractPOList.reload();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "PO",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                });
        }
    }
})