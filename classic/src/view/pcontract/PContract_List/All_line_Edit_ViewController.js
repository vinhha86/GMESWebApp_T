Ext.define('GSmartApp.view.pcontract.All_line_Edit_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.All_line_Edit_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPOStore');
        store.setGroupField('productbuyercode');
        var pcontractid_link = viewmodel.get('pcontractid_link');
        var potype = viewmodel.get('potype');
        store.loadByPContractAndType(pcontractid_link, potype);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onEdit: function (editor, context, e) {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = context.record.data;
        GSmartApp.Ajax.post('/api/v1/pcontract_po/quick_update_line', Ext.JSON.encode(params),
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
                        viewmodel.set('isEdit', false);
                        var store = viewmodel.getStore('PContractProductPOStore');
                        if (store)
                            store.commitChanges();
                        me.fireEvent('Reload');
                    }
                }
            })
    },
    onFocus: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isEdit', true);
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onMenu: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Xóa Line giao hàng',
                    itemId: 'btnPausePO_PContract_PO_List',
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-ban violetIcon',
                    // hidden: ishidden_accept,
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoaPOLine(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },
    onXoaPOLine: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Line giao hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store = viewmodel.getStore('PContractProductPOStore');
                    var params = new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                store.load();
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
})