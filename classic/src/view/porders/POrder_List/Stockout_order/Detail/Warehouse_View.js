Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Warehouse_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Warehouse_View',
    id: 'Warehouse_View',
    controller: 'Warehouse_ViewCotroller',
    viewModel: {
        type: 'Warehouse_ViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    features: [{
        id: 'grouping',
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip: ""
    }],
    bind: {
        store: '{POrderBomColorStore}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120
    }, {
        text: 'Tên NPL',
        dataIndex: 'materialName',
        width: 150
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL_product',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho_product',
        width: 80
    }, {
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unitName',
        width: 70
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Chọn',
            margin: 5,
            itemId: 'btnChon',
            iconCls: 'x-fa fa-check'
        }]
    }]
});

