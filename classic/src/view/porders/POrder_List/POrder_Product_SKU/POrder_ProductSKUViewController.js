Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_ProductSKUViewController',
    init: function () {
        // let me = this.getView();
        // this.loadInfo(me.IdPOrder);
    },
    control: {

    },
    listen: {
        controller: {
            'POrder_List_GrantSKUViewController': {
                'UpdatePorder': 'onUpdatePorder'
            }
        }
    },

    onUpdatePorder: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('porderSKUStore');
        store.load();
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEdit: function (editor, context, eOpts) {
        var me = this;
        var grid = this.getView();
        var viewModel = this.getViewModel();

        if (context.value != context.originalValue) {
            var store = viewModel.getStore('porderSKUStore');

            if (context.value < context.record.get('pquantity_granted')) {
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: "Bạn không được điều chỉnh số lượng lệnh nhỏ hơn số lượng đã phân cho các tổ",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                store.rejectChanges();
            }
            else {
                grid.setLoading("Đang xử lý");
                var params = new Object();
                params.data = context.record.data;

                GSmartApp.Ajax.post('/api/v1/porderlist/update_pordersku', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            if (response.respcode != 200) {
                                store.rejectChanges();
                            }
                            else {
                                store.commitChanges();
                                var store_line = viewModel.getStore('POLineSKU_Store');
                                store_line.load();
                            }
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Lưu thất bại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });

                        }
                        grid.setLoading(false);
                    })
            }
        }
    },
})