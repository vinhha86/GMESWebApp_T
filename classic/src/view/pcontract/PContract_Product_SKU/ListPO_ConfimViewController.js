Ext.define('GSmartApp.view.pcontract.ListPO_ConfimViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListPO_ConfimViewController',
    init: function () {
        var me = this;
        this.LoadData();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXoa': {
            click: 'onXoa'
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
    onThoat: function () {
        this.getView().up('window').close();
    },
    onXoa: function () {
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn PO Line để xóa',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();
            var list = [];
            for (var i = 0; i < select.length; i++) {
                list.push(select[i].data);
            }
            params.listid = list;

            GSmartApp.Ajax.post('/api/v1/pcontract_po/delete_listline', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Xóa thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                            grid.fireEvent('XoaThanhCong');
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Xóa thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    } else {
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
    },
    LoadData: function () {
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.pcontract_poid_link = viewmodel.get('pcontract_poid_link');
        params.mausanphamid_link = 0;

        GSmartApp.Ajax.post('/api/v1/pcontract_po/getPOLine_Confirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('PContractPOStore');
                        store.removeAll();
                        store.setData(response.data);
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
})