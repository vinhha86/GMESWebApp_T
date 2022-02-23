Ext.define('GSmartApp.view.Schedule.Plan.Plan_break_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_break_Controller',
    init: function () {
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        var pordergrantid_link = viewmodel.get('plan.pordergrant_id_link');
        store.loadStore_NotAsync(pordergrantid_link);
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records.length == 0) {
                    viewmodel.set('ishidden', false);
                    view.down('#amount').focus();
                }
            }
        })
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onBreak'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var rec = context.record;
        if (context.value > rec.get('grantamount')) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng tách không được lớn hơn số lượng đang hiện có!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    // rec.set('amount_break', context.originalValue == null ? 0 : context.originalValue);
                    var store = viewmodel.getStore('POrder_ListGrantSKUStore');
                    store.rejectChanges();
                }
            });
        }
    },
    onBreak: function () {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = viewmodel.get('plan');
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        var list_sku = [];
        var sum = 0;
        store.each(function (record) {
            var data = new Object();
            data = record.data;
            data.amount_break = data.amount_break == null ? 0 : data.amount_break;
            if (data.amount_break > 0)
                list_sku.push(data);
            var amount = parseInt(record.data.amount_break == null ? "0" : "0" + record.data.amount_break);
            sum += amount;
        });

        if (!viewmodel.get('ishidden') && sum == 0) {
            sum = viewmodel.get('amount') == "" ? 0 : parseInt(viewmodel.get('amount').toString().replace(/,/gi, ''));
        }

        if (sum == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng tách không được bằng 0',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            params.data = list_sku;
            params.quantity = sum;

            grid.setLoading('Đang xử lý dữ liệu');
            GSmartApp.Ajax.post('/api/v1/schedule/break_porder', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            me.fireEvent('BreakPorder', response);
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Cập nhật thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }

    }
})