Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_order_warehouse_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_order_warehouse_ViewController',
    init: function () {

    },
    control: {
        '#btnHideWarehouse': {
            click: 'onHide'
        },
        '#radiofilter': {
            change: 'onFilter'
        },
        '#btnAddmat': {
            click: 'onAddMat'
        }
    },
    onHide: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('width_npl', '100%');
    },
    onFilter: function () {
        var viewmodel = this.getViewModel();
        var warehouse_grid = Ext.getCmp('Stockout_order_warehouse_View');
        warehouse_grid.setLoading("Đang tải dữ liệu");
        var material_skuid_link = viewmodel.get('material_skuid_link') == null ? viewmodel.get('npl.id') : viewmodel.get('material_skuid_link');
        var org_from_id_link = viewmodel.get('org_from_id_link');
        var porderid_link = viewmodel.get('porderid_link');
        var type = viewmodel.get('type.type');
        var stockout_orderid_link = viewmodel.get('stockout_orderid_link');
        var pcontractid_link = viewmodel.get('pcontractid_link');

        var warehouseStore = viewmodel.getStore('WarehouseStore');
        warehouseStore.removeAll();
        if (type == 1) {
            warehouseStore.setGroupField('');
        }
        else if (type == 2) {
            warehouseStore.setGroupField('contractcode');
        }
        else if (type == 3) {
            warehouseStore.setGroupField('buyername');
        }

        warehouseStore.loadbyorg(material_skuid_link, org_from_id_link, porderid_link, pcontractid_link, type, stockout_orderid_link, function (records, operation, success) {
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
    onAddMat: function () {
        var me = this;
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn cây vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var viewmodel = this.getViewModel();
            var store_wh = viewmodel.getStore('WarehouseStore');
            var list_data = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                list_data.push(data);
            }
            me.fireEvent('AddMat', list_data);
            store_wh.remove(select);
        }
    }
})