Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_ViewController',
    init: function () {
    },
    control: {
        '#btnThemSoDo': {
            click: 'onThemSoDo'
        },
        '#btnShowNPL': {
            click: 'onShowNPL'
        },
        '#btnAdd_CutPlan': {
            click: 'onThemKeHoach'
        },
        '#CutPlan_View': {
            itemclick: 'onSelectRow'
        },
        '#cmbLoaiPhoi': {
            select: 'onSelectLoaiPhoi'
        }
    },
    listen: {
        store: {
            'LoaiPhoiStore': {
                "LoadDone": 'onLoadLoaiPhoiDone'
            }
        }
    },
    onLoadLoaiPhoiDone: function (record) {
        console.log(record);
        if (record != null) {
            var viewmodel = this.getViewModel();
            viewmodel.set('loaiphoimau', record.get('name'));
            this.onSelectLoaiPhoi(null, record, null);
        }
    },
    onSelectRow: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        if (record.get('type') == 0) {
            viewmodel.set('cutplanrowid_link', record.get('id'));

            var grid = this.getView();
            var warehouse_view = grid.up('CutPlan_DetailView').up('CutPlan_Tab_View').up('CutPlan_MainView').down('#Cutplan_Warehouse_MainView');
            warehouse_view.setLoading('Đang tải dữ liệu');

            var storecutplan_warehouse = viewmodel.getStore('WarehouseCutplanStore');
            var cutplanrowid_link = viewmodel.get('cutplanrowid_link');

            storecutplan_warehouse.loadby_cutplan(cutplanrowid_link, function (records, operation, success) {
                warehouse_view.setLoading(false);
            })
        }

    },
    onThemKeHoach: function () {
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');

        if (npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var form = Ext.create('Ext.window.Window', {
                height: 200,
                width: 300,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: "Thêm loại phối màu",
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'ThemLoaiPhoiView'
                }]
            });
            form.show();

            form.down('#ThemLoaiPhoiView').getController().on('ThemLoaiPhoi', function (loaiphoi) {
                form.close();
                var params = new Object();
                params.material_skuid_link = npl.id;
                params.porderid_link = null;
                params.productid_link = viewmodel.get('productid_link');
                params.pcontractid_link = viewmodel.get('pcontractid_link');
                params.colorid_link = viewmodel.get('colorid_link_active');
                params.loaiphoi = loaiphoi;

                GSmartApp.Ajax.post('/api/v1/cutplan/create', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode != 200) {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Lưu thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            else {
                                //Thanh cong thi commit de bo dau do trong grid
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Tạo thành công',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    },
                                    fn: function () {
                                        var LoaiPhoiStore = viewmodel.getStore('LoaiPhoiStore');
                                        LoaiPhoiStore.loadStore(params.pcontractid_link, params.productid_link, npl.id);
                                    }
                                });
                            }
                        }
                    })
            })


        }
    },
    onShowNPL: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isHiddenNPL', false);
        viewmodel.set('width_npl', "30%");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('type') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa sơ đồ ?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        var porder = viewmodel.get('porder');
                        var npl = viewmodel.get('npl');

                        var params = new Object();
                        params.cutplanrowid_link = rec.get('id');
                        params.porderid_link = 0;
                        params.material_skuid_link = npl.id;
                        params.productid_link = viewmodel.get('productid_link');
                        params.pcontractid_link = viewmodel.get('pcontractid_link');

                        GSmartApp.Ajax.post('/api/v1/cutplan/delete_row', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var response = Ext.decode(response.responseText);
                                    if (response.respcode == 200) {
                                        var store = viewmodel.getStore('CutPlanRowStore');
                                        store.remove(rec);
                                        store.load();
                                        console.log(1234);
                                        me.fireEvent('ReloadBOM');
                                    }
                                    else {
                                        Ext.Msg.alert({
                                            title: "Thông báo",
                                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'Đóng'
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
    onEdit: function (editor, context, e) {
        if (context.originalValue == context.value) return;
        if (context.colIdx > 6) {
            this.UpdateSizeAmount(context);
        } else if (context.colIdx == 6) { // ngay
            return;
        } else {
            this.UpdateRow(context);
        }
    },
    UpdateRow: function (context) {
        var me = this;
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('CutPlanRowStore');

        var params = new Object();
        params.data = context.record.data;

        if (context.field != 'ngay') {
            var arr = context.record.get('ngay').split('-');
            var ngay = new Date(arr[2], parseInt(arr[0]) - 1, arr[1]);

            params.data.ngay = ngay;
        }
        params.data.loaiphoimau = viewmodel.get('loaiphoimau');


        GSmartApp.Ajax.post('/api/v1/cutplan/update_row', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        store.load();
                        var storeBom = viewmodel.getStore('POrderBom2Store');
                        storeBom.load();
                        me.fireEvent('ReloadBOM');
                    }
                    else {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                }
            })
    },
    UpdateSizeAmount: function (context) {
        if (context.value == context.originalValue) return;

        var me = this;
        var viewmodel = this.getViewModel();
        // var porder = viewmodel.get('porder');
        var npl = viewmodel.get('npl');
        var store = viewmodel.getStore('CutPlanRowStore');

        var params = new Object();
        params.porderid_link = 0;
        params.material_skuid_link = npl.id;
        params.productid_link = viewmodel.get('productid_link');
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.colorid_link = viewmodel.get('colorid_link_active');
        params.sizeid_link = parseInt(context.field);
        params.amount = parseInt(context.value);
        params.cutplanrowid_link = context.record.get('id');
        params.amount_old = parseInt(context.originalValue);
        params.loaiphoi = viewmodel.get('loaiphoimau');

        GSmartApp.Ajax.post('/api/v1/cutplan/update_size_amount', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        store.load();
                        console.log(123);
                        me.fireEvent('ReloadBOM');
                    }
                    else {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                }
                else {
                    store.rejectChanges();
                }
            })
    },
    onThemSoDo: function () {
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');

        if (npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        if (viewmodel.get('loaiphoimau') == "" || viewmodel.get('loaiphoimau') == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn loại phối màu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        var params = new Object();
        var porder = viewmodel.get('porder');
        params.porderid_link = 0;
        params.material_skuid_link = npl.id;
        params.productid_link = viewmodel.get('productid_link');
        params.pcontractid_link = viewmodel.get('pcontractid_link');
        params.colorid_link = viewmodel.get('colorid_link_active');
        params.loaiphoi = viewmodel.get('loaiphoimau');

        GSmartApp.Ajax.post('/api/v1/cutplan/add_row', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('CutPlanRowStore');
                        store.load();
                    }
                }
            })
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 7;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var productid_link = viewmodel.get('productid_link');
        var pcontractid_link = viewmodel.get('pcontractid_link');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    var colorid_link = viewmodel.get('colorid_link_active');

                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.sizeid_link) && data.color_id == colorid_link) {
                            listid.push(data.sizeid_link);
                            listtitle.push(data.coSanPham);
                        }
                    }

                    for (var i = 0; i < listtitle.length; i++) {

                        var column = Ext.create('Ext.grid.column.Number', {
                            text: listtitle[i],
                            xtype: 'numbercolumn',
                            dataIndex: listid[i].toString(),
                            width: 65,
                            sortable: false,
                            menuDisabled: true,
                            align: 'right',
                            getEditor: function (record) {
                                if (record.get('type') == 0) {
                                    return Ext.create('Ext.grid.CellEditor', {
                                        field: {
                                            xtype: 'textfield',
                                            selectOnFocus: true,
                                            maskRe: /[0-9]/
                                        }
                                    })
                                }
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0,000')
                            }
                        });
                        grid.headerCt.insert(length, column);
                        length++;
                    }

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 9) {
                            model.removeFields(fields[i].name);
                        }
                    }

                    var fieldnew = [];
                    for (var i = 0; i < listid.length; i++) {
                        fieldnew.push({ name: listid[i], type: 'number' });
                    }

                    model.addFields(fieldnew);
                }
            })
    },
    onSelectLoaiPhoi: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var colorid_link = viewmodel.get('colorid_link_active');
        var porderid_link = 0;
        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');
        var npl = viewmodel.get('npl');
        var loaiphoi = rec.get('name');

        var store = viewmodel.getStore('CutPlanRowStore');
        store.loadStore_byloaiphoi(colorid_link, porderid_link, npl.id, productid_link,
            pcontractid_link, loaiphoi);
    }
})