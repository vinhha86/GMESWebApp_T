Ext.define('GSmartApp.view.pcontract.PContract_Bom_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_ViewController',
    control: {
        '#fileUploadBom': {
            change: 'onSelectFile'
        },
        '#fileUploadBomSizeset': {
            change: 'onSelectFile_Sizeset'
        },
        '#cmbSanPham': {
            select: 'onChangeProduct'
        },
        '#btndownloadsize': {
            click: 'onDownTemp'
        },
        '#btndownloadsizeset': {
            click: 'onDownTempSizeSet'
        },
        '#btn_UploadBomSize': {
            click: 'onUpload'
        },
        '#btn_UploadBomSizeSet': {
            click: 'onUploadSizeset'
        },
        '#btnConfirmBOM': {
            click: 'onConfirmBOM2'
        },
        '#btnAddMaterial_Bom': {
            click: 'onThemMoiNPL'
        },
        '#PContract_Bom_View': {
            celldblclick: 'onCellDblClick',
            cellcontextmenu: 'onCellMenu'
        },
        '#btnDeleteBOM': {
            click: 'onDeleteBom'
        }
    },
    listen: {
        store: {
            'PContractBom2ColorStore': {
                'loaddone': 'onLoadBomDone'
            }
        }
    },
    init: function () {
    },
    onDeleteBom: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom2Store_New');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa định mức ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.pcontractid_link = viewmodel.get('PContract.id');
                    params.productid_link = viewmodel.get('IdProduct');
                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/delete_bom', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                                else {
                                    store.removeAll();
                                }
                            } else {
                                var response = Ext.decode(response.responseText);
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onCellMenu: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex == 7) {
            var me = this;
            var viewmodel = this.getViewModel();
            var hiddenPaste = viewmodel.get('obj_copy_poline') == null ? true : false;

            var menu_grid = new Ext.menu.Menu({
                xtype: 'menu',
                anchor: true,
                minWidth: 150,
                items: [
                    {
                        text: 'Copy PO Line',
                        itemId: 'menuCopyPOline',
                        separator: true,
                        iconCls: 'x-fa fas fa-copy brownIcon',
                        handler: function () {
                            me.onCopy(record);
                        }
                    }, {
                        text: 'Paste',
                        itemId: 'menuPastePOLine',
                        separator: true,
                        hidden: hiddenPaste,
                        iconCls: 'x-fa fas fa-paste redIcon',
                        handler: function () {
                            me.onPaste(record);
                        }
                    }
                ]
            });
            // HERE IS THE MAIN CHANGE
            var position = [e.getX() - 10, e.getY() - 10];
            e.stopEvent();
            menu_grid.showAt(position);
            common.Check_Menu_Permission(menu_grid);
        }
    },
    onCopy: function (record) {
        var viewmodel = this.getViewModel();
        viewmodel.set('obj_copy_poline', record);
    },
    onPaste: function (record) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.material_skuid_link = viewmodel.get('obj_copy_poline').get('materialid_link');
        params.material_skuid_link_des = record.get('materialid_link');

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/copy_poline', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('PContractBom2Store_New');
                        var po_line = viewmodel.get('obj_copy_poline').get('po_line');
                        for (var i = 0; i < store.data.length; i++) {
                            var rec = store.data.items[i];
                            if (rec.get('materialid_link') == record.get('materialid_link')) {
                                rec.set('po_line', po_line);
                            }
                        }
                        store.commitChanges();
                        viewmodel.set('obj_copy_poline', null);
                    }
                }
            })
    },
    onCellDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (cellIndex == 7) {
            me.ShowPO(record);
        }
    },
    ShowPO: function (record) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom2Store_New');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            title: 'Danh sách PO sử dụng NPL ' + record.get('materialName') + "(" + record.get('materialCode') + ")",
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_Bom_PO_MainView',
                viewModel: {
                    data: {
                        pcontractid_link: viewmodel.get('PContract.id'),
                        productid_link: viewmodel.get('IdProduct'),
                        material_skuid_link: record.get('materialid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('PContract_Bom_PO_MainView').getController().on('Thoat', function () {
            form.close();
        });

        form.down('PContract_Bom_PO_MainView').on('SelectDone', function (data) {
            var po_line = record.get('po_line');
            po_line += ", " + data;
            if (po_line[0] == ",")
                po_line = po_line.substr(1);
            // record.set('po_line', po_line);
            for (var i = 0; i < store.data.length; i++) {
                var rec = store.data.items[i];
                if (rec.get('materialid_link') == record.get('materialid_link')) {
                    rec.set('po_line', po_line);
                }
            }
            store.commitChanges();
        });

        form.down('PContract_Bom_PO_MainView').on('DeSelectDone', function (data) {
            var po_line = record.get('po_line');
            po_line = po_line.replace(', ' + data, '').replace(data + ", ", '').replace(data, '');
            // record.set('po_line', po_line);

            for (var i = 0; i < store.data.length; i++) {
                var rec = store.data.items[i];
                if (rec.get('materialid_link') == record.get('materialid_link')) {
                    rec.set('po_line', po_line);
                }
            }
            store.commitChanges();
        })
    },
    onThemMoiNPL: function () {
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
            width: Ext.getBody().getViewSize().width * .99,
            height: Ext.getBody().getViewSize().height * .99,
            reference: 'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContract_Bom_View',
                    searchtype: 5,
                    pcontractid_link: viewmodel.get('PContract.id'),
                    productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();

        form.getController().on('reload', function () {
            var store = viewmodel.getStore('PContractBom2Store_New');
            store.load();
        })
    },
    onUpload: function (record) {
        var me = this.getView();
        me.down('#fileUploadBom').fileInputEl.dom.click();
    },
    onUploadSizeset: function () {
        var me = this.getView();
        me.down('#fileUploadBomSizeset').fileInputEl.dom.click();
    },
    onSelectFile: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('productid_link', viewmodel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom/bom_candoi', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewmodel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFile_Sizeset: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('productid_link', viewmodel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom_sizeset/bom_candoi_sizeset', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewmodel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onFilterValueKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('PContractBom2Store_New');
        var filterField = this.lookupReference('ValueFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.valueFilter = filters.add({
                id: 'valueFilter',
                property: 'color_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.valueFilter) {
            filters.remove(this.valueFilter);
            this.valueFilter = null;
        }
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractBom2Store_New');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'materialCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    onFilterValueTenNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('PContractBom2Store_New');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'materialName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },
    onDownTemp: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.productid_link = viewmodel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_CanDoi.xlsx", response.data);
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
    onDownTempSizeSet: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.productid_link = viewmodel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi_sizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_CanDoi_SizeSet.xlsx", response.data);
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
    onChangeProduct: function (combo, rec, eOpts) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('IdProduct') > 0) {
            var me = this;
            me.CreateColumns();
            viewmodel.set('hidden_chotdinhmuc', false);
            viewmodel.set('disabled_chotdinhmuc', true);
        }

    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) {
        return common.Check_ActionColum_Permission(item.itemId);
    },
    renderUnit: function (value, metaData, record, rowIdx, colIdx, store) {
        var me = this;
        var storeUnit = me.getViewModel().getStore('UnitStore');
        if (value != null) {
            var rec = storeUnit.findRecord("id", value, 0, false, false, true);
            if (rec != null) {
                return rec.data.code;
            } else {
                return record.data.unitName;
            }
        } else {
            return '';
        }
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nguyên phụ liệu "' + rec.data.materialCode + '" ?',
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

                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/deletematerial', Ext.JSON.encode(params),
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
                                    var storebom = viewmodel.getStore('PContractProductBom2Store');
                                    storebom.load();
                                }
                            }
                        })
                }
            }
        });
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 11;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract.id');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.sizeid_link)) {
                            listid.push(data.sizeid_link);
                            listtitle.push(data.coSanPham);
                        }
                    }

                    for (var i = 0; i < listtitle.length; i++) {
                        if ("" + listtitle[i] == "") continue;

                        var column = Ext.create('Ext.grid.column.Number', {
                            text: listtitle[i],
                            xtype: 'numbercolumn',
                            dataIndex: listid[i].toString(),
                            width: 65,
                            format: '0.0000',
                            align: 'right',
                            editor: {
                                xtype: 'textfield',
                                selectOnFocus: true,
                                maskRe: /[0-9.]/
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0.0000')
                            }
                        });
                        grid.headerCt.insert(length, column);
                        length++;
                    }
                    grid.headerCt.gridDataColumns[0].locked = true;
                    grid.headerCt.gridDataColumns[1].locked = true;
                    grid.headerCt.gridDataColumns[2].locked = true;

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 24) {
                            model.removeFields(fields[i].name);
                        }
                    }

                    var fieldnew = [];
                    for (var i = 0; i < listid.length; i++) {
                        fieldnew.push({ name: listid[i], type: 'number' });
                    }

                    model.addFields(fieldnew);
                    storeBOM.removeFilter();
                    storeBOM.load_bom_by_product_multithread(pcontractid_link, productid_link);
                    // storeBOM.load_bom_by_product_withcallback(pcontractid_link, productid_link);
                }
            })
    },
    onConfirmBOM2: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');
        me.setLoading('Đang xử lý dữ liệu');
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/confim_bom2', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewmodel.set('disabled_chotdinhmuc', true);
                        viewmodel.set('text_chotdinhmuc', 'Định mức đã chốt');
                    }
                }
            })
    },
    onLoadBomDone: function (isbomdone) {
        var viewmodel = this.getViewModel();
        if (!isbomdone)
            viewmodel.set('text_chotdinhmuc', 'Chốt định mức');
        else
            viewmodel.set('text_chotdinhmuc', 'Định mức đã chốt');
        viewmodel.set('disabled_chotdinhmuc', isbomdone);
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();

        if (context.value == context.originalValue) {
            var store = viewmodel.getStore('PContractBom2ColorStore');
            store.rejectChanges();
            return;
        }

        var me = this;

        if (context.field == "unitid_link" || context.field == "lost_ratio") {
            me.updateMaterial(context);
        }
        else {
            me.updateSKU(context);
        }
    },
    updateMaterial: function (context) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.isUpdateBOM = false;

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
                        var storebom = viewmodel.getStore('PContractBom2Store_New');

                        for (var i = 0; i < storebom.data.length; i++) {
                            var rec = storebom.data.items[i];
                            if (rec.get('id') == data.id) {
                                rec.set('unitid_link', data.unitid_link);
                                rec.set('lost_ratio', data.lost_ratio);
                            }
                        }
                        storebom.commitChanges();
                    }
                }
            })
    },
    updateSKU: function (record) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.record.data;
        params.colorid_link = record.record.data.colorid_link;
        params.sizeid_link = record.field;
        params.value = record.value;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbomsku', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractBom2Store_New');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
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
})