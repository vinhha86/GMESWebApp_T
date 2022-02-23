Ext.define('GSmartApp.view.porders.POrder_List.POrderBom2.POrderBom2ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBom2ViewController',
    init: function () {

    },
    control: {
        '#btnDongBo': {
            click: 'onDongBo'
        }
    },
    listen: {
        controller: {
            'CutPlan_ViewController': {
                'ReloadBOM': 'onReloadBOM'
            }
        }
    },
    onReloadBOM: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderBom2Store');
        store.getbom_by_porder(viewmodel.get('porder.id'));
    },
    onDongBo: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        grid.setLoading('Đang đồng bộ');

        var params = new Object();
        params.porderid_link = viewmodel.get('porder.id');

        GSmartApp.Ajax.post('/api/v1/porderbom/sync', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "Đồng bộ thành công";
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        mes = "Đồng bộ thất bại";
                    }
                    else {
                        if (!response.isbomdone) {
                            mes = response.message;
                        }
                        var store = viewmodel.getStore('POrderBom2Store');
                        store.getbom_by_porder(viewmodel.get('porder.id'));
                    }
                } else {
                    mes = "Đồng bộ thất bại";
                }

                Ext.Msg.show({
                    title: "Thông báo",
                    msg: mes,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    }
                });
            })
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrderBom2Store');
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
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        grid.setLoading('Đang lấy dữ liệu');
        var length = 5;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var porderid_link = viewmodel.get('IdPOrder');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.porderid_link = porderid_link;

        GSmartApp.Ajax.post('/api/v1/porder/getsku_by_porder', Ext.JSON.encode(params),
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
                            columns: [{
                                text: 'CĐ',
                                dataIndex: listid[i].toString(),
                                width: 65,
                                format: '0.0000',
                                align: 'right',
                                renderer: function (value, metaData, record) {
                                    if (value == 0) return "";
                                    return Ext.util.Format.number(value, '0.0000')
                                }
                            }, {
                                text: 'KT',
                                dataIndex: listid[i] + "_KT",
                                cls: 'titleRed',
                                width: 65,
                                format: '0.0000',
                                align: 'right',
                                renderer: function (value, metaData, record) {
                                    if (value == 0) return "";
                                    return Ext.util.Format.number(value, '0.0000')
                                }
                            }, {
                                text: 'SX',
                                dataIndex: listid[i] + "_SX",
                                cls: 'titleRed',
                                width: 65,
                                format: '0.0000',
                                align: 'right',
                                renderer: function (value, metaData, record) {
                                    if (value == 0) return "";
                                    return Ext.util.Format.number(value, '0.0000')
                                }
                            }]
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
                    storeBOM.getbom_by_porder(porderid_link);
                }
            })
    },
    onFilterValueKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrderBom2Store');
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
    }
})