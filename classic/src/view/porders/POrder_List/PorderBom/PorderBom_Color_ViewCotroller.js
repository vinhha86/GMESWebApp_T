Ext.define('GSmartApp.view.porders.POrder_List.PorderBom.PorderBom_Color_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PorderBom_Color_ViewCotroller',
    init: function () {

    },
    onFilterValueMaNPLKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrderBomColorStore');
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
        var length = 10
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var porderid_link = viewmodel.get('porder.id');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = viewmodel.get('porder.pcontractid_link');
        params.productid_link = viewmodel.get('porder.productid_link');

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.sizeid_link) && data.color_id == grid.colorid_link) {
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

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 20) {
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
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        if (context.value == context.originalValue) {
            var store = viewmodel.getStore('POrderBomColorStore');
            store.rejectChanges();
            return;
        }

        var me = this;

        if (context.field == "amount") {
            me.updateBOM(context.record, true);
        }
        else if (context.field == "amount_color") {
            me.updateColor(context.record);
        }
        else if (context.field == "lost_ratio") {
            me.updateBOM(context.record, false);
        }
        else {
            me.updateSKU(context);
        }
    },
    updateColumnSize: function (record) {
        var me = this;
        var grid = this.getView();
        var column = grid.getColumns();
        for (var i = 0; i < column.length; i++) {
            if (i > 9) {
                record.set(column[i].dataIndex, 0);
            }
        }
    },
    updateBOM: function (record, isupdateBom) {
        var grid = this.getView();
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        params.isUpdateBOM = isupdateBom;
        GSmartApp.Ajax.post('/api/v1/porderbom/update_poder_bom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('POrderBomColorStore');
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
                        if (isupdateBom) {
                            me.updateColumnSize(record);
                            record.set("amount_color", 0);
                        }

                        store.commitChanges();
                    }
                }
            })
    },
    updateColor: function (record) {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        params.colorid_link = grid.colorid_link;

        GSmartApp.Ajax.post('/api/v1/porderbom/update_porder_bomcolor', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('POrderBomColorStore');
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
                        record.set("amount", 0);
                        me.updateColumnSize(record);
                        store.commitChanges();
                    }
                }
            })
    },
    updateSKU: function (record) {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.record.data;
        params.colorid_link = grid.colorid_link;
        params.sizeid_link = record.field;
        params.value = record.value;

        GSmartApp.Ajax.post('/api/v1/porderbom/update_porder_bomsku', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('POrderBomColorStore');
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
                        //Thanh cong thi commit de bo dau do trong grid
                        record.record.set("amount", 0);
                        record.record.set("amount_color", 0);
                        store.commitChanges();
                    }
                }
            })
    }
})