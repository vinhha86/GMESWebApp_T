Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_GrantSKUViewController',
    init: function () {
    },
    control: {
        '#btnThemSKU': {
            click: 'onThemSKU'
        }
    },
    listen: {
        controller: {
            'POrder_List_DetailWindowViewController': {
                'UpdatePorder': 'onUpdatePorder'
            }
        }
    },
    onUpdatePorder: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        store.load();
    },
    onThemSKU: function () {
        var viewmodel = this.getViewModel();
        var mes = "";
        if (viewmodel.get('IdPOrder') == 0 || viewmodel.get('IdPOrder') == null) {
            mes = "Bạn chưa chọn lệnh sản xuất";
        }
        else if (viewmodel.get('IdGrant') == 0 || viewmodel.get('IdGrant') == null) {
            mes = "Bạn chưa chọn tổ chuyền";
        }

        if (mes != "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var window = Ext.create('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowView', {
                viewModel: {
                    data: {
                        IdPOrder: viewmodel.get('IdPOrder'),
                        IdGrant: viewmodel.get('IdGrant'),
                        pcontract_poid_link: viewmodel.get('IdPContractPO'),
                        isEditSL: false,
                        isProductSkuSelectHidden: false
                    }
                }
            });
            window.show();

            window.down('#POrder_List_GrantSKUView_window').getController().on('UpdatePorder', function (porderinfo, amount) {
                var store = viewmodel.getStore('POrder_ListGrantSKUStore');
                store.load();

                var storeGrant = viewmodel.getStore('POrder_ListGrantStore');
                storeGrant.load();
            });

            window.on('Thoat', function (porderinfo, amount) {
                window.close();
            });
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEdit: function (editor, context, eOpts) {
        let me = this;

        if (context.value == context.originalValue) {
            return;
        }

        if (context.field == 'grantamount') {
            me.updateGrantAmount(context.record);
        }
    },
    updateGrantAmount: function (record) {
        var m = this;
        let me = this.getView();
        let viewModel = this.getViewModel();
        let POrder_ListGrantSKUStore = viewModel.getStore('POrder_ListGrantSKUStore');
        let data = record.data;

        let params = new Object();
        params.data = data;
        params.idPOrder = viewModel.get('IdPOrder');
        params.idGrant = viewModel.get('IdGrant');

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.post('/api/v1/porderlist/savegrantskuonchange', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        POrder_ListGrantSKUStore.commitChanges();
                        viewModel.set('porderinfo', response.porderinfo);
                        viewModel.set('amount', response.amount);
                        m.fireEvent('UpdatePorder', viewModel.get('porderinfo'), viewModel.get('amount'), response.endDate, viewModel.get('IdGrant'), response.duration);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        POrder_ListGrantSKUStore.rejectChanges();
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
                    POrder_ListGrantSKUStore.rejectChanges();
                }
                me.setLoading(false);
            })
    },
})