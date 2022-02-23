Ext.define('GSmartApp.view.cut_plan.DinhMucKyThuatViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DinhMucKyThuatViewController',
    init: function () {
        this.CreateColumns();
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 5;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var pcontractid_link = viewmodel.get('pcontractid_link');
        var productid_link = viewmodel.get('productid_link');

        if (productid_link != 0 && productid_link != null) {
            grid.setLoading('Đang lấy dữ liệu');
            //kiem tra mau co trong sku khong thi moi sinh tab 
            var params = new Object();
            params.pcontractid_link = pcontractid_link;
            params.productid_link = productid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
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

                            var column = Ext.create('Ext.grid.column.Column', {
                                text: listtitle[i],
                                sortable: false,
                                menuDisabled: true,
                                columns: [{
                                    text: 'CĐ',
                                    dataIndex: listid[i].toString(),
                                    width: 65,
                                    sortable: false,
                                    menuDisabled: true,
                                    format: '0.0000',
                                    align: 'right',
                                    renderer: function (value, metaData, record) {
                                        if (value == 0) return "";
                                        return Ext.util.Format.number(value, '0.0000')
                                    }
                                }, {
                                    text: 'KT',
                                    sortable: false,
                                    menuDisabled: true,
                                    columns: [{
                                        text: 'Viền',
                                        dataIndex: listid[i] + "_Vien",
                                        cls: 'titleRed',
                                        width: 65,
                                        sortable: false,
                                        menuDisabled: true,
                                        format: '0.0000',
                                        align: 'right',
                                        renderer: function (value, metaData, record) {
                                            if (value == 0) return "";
                                            return Ext.util.Format.number(value, '0.0000')
                                        },
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
                                    }, {
                                        text: 'SĐ',
                                        dataIndex: listid[i] + "_KT",
                                        cls: 'titleRed',
                                        width: 65,
                                        sortable: false,
                                        menuDisabled: true,
                                        format: '0.0000',
                                        align: 'right',
                                        renderer: function (value, metaData, record) {
                                            if (value == 0) return "";
                                            return Ext.util.Format.number(value, '0.0000')
                                        }
                                    },{
                                        text: '% C/lệch',
                                        dataIndex: listid[i] + "_PhanTramChenhLech",
                                        // cls: 'titleRed',
                                        width: 80,
                                        sortable: false,
                                        menuDisabled: true,
                                        // format: '0.00',
                                        align: 'right',
                                        renderer: function (value, metaData, record) {
                                            if (value == 0 || value == null) return "";
                                            return value;
                                            // return Ext.util.Format.number(value, '0.0000');
                                        }
                                    }, {
                                        text: 'Tổng',
                                        dataIndex: listid[i] + "_Tong",
                                        cls: 'titleRed',
                                        width: 70,
                                        sortable: false,
                                        menuDisabled: true,
                                        format: '0.0000',
                                        align: 'right',
                                        renderer: function (value, metaData, record) {
                                            if (value == 0) return "";
                                            return Ext.util.Format.number(value, '0.0000')
                                        }
                                    }]
                                }, {
                                    text: 'SX',
                                    dataIndex: listid[i] + "_SX",
                                    cls: 'titleRed',
                                    width: 65,
                                    sortable: false,
                                    menuDisabled: true,
                                    format: '0.0000',
                                    align: 'right',
                                    renderer: function (value, metaData, record) {
                                        if (value == 0) return "";
                                        return Ext.util.Format.number(value, '0.0000')
                                    }
                                }, ]
                            })
                            grid.headerCt.insert(length, column);
                            length++;
                        }

                        var storeBOM = grid.getStore();

                        var model = storeBOM.getModel();
                        var fields = model.getFields();
                        for (var i = 0; i < fields.length; i++) {
                            if (i > 21) {
                                model.removeFields(fields[i].name);
                            }
                        }

                        var fieldnew = [];
                        for (var i = 0; i < listid.length; i++) {
                            fieldnew.push({ name: listid[i], type: 'number' });
                        }

                        model.addFields(fieldnew);
                        // storeBOM.getbom_by_porder(porderid_link);
                    }
                })
        }


    }
})