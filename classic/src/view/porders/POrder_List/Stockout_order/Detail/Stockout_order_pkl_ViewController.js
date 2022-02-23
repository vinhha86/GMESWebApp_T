Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_pkl_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_pkl_ViewController',
    init: function () {

    },
    control: {
        '#btnAdd_material': {
            click: 'onLockMat'
        }
    },
    onLockMat: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '50%');

        var warehouse_grid = Ext.getCmp('Stockout_order_warehouse_View');
        warehouse_grid.setLoading("Đang tải dữ liệu");
        var material_skuid_link = viewmodel.get('material_skuid_link');
        var org_from_id_link = viewmodel.get('org_from_id_link');
        var porderid_link = viewmodel.get('porderid_link');
        var type = viewmodel.get('type.type');
        var stockout_orderid_link = viewmodel.get('stockout_orderid_link');

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.setGroupField('');

        warehouseStore.loadbyorg(material_skuid_link, org_from_id_link, porderid_link, type, stockout_orderid_link, function (records, operation, success) {
            warehouse_grid.setLoading(false);
        })
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderCount: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' Cây</div>';
    },
    onUnlock: function (grid, rowIndex, colIndex, item, e, record) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.id = record.get('id');

        GSmartApp.Ajax.post('/api/v1/stockoutorder/unlock_pkl', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thông tin thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var store_pkl = viewmodel.getStore('Stockout_order_pkl_Store');
                        store_pkl.remove(record);

                        var store_wh = viewmodel.getStore('WarehouseStore');
                        if (viewmodel.get('width_npl') != '100%') {
                            store_wh.load();
                        }

                        grid.up('Stockout_order_pkl_MainView').fireEvent("XoaPKL");
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })


    }
})