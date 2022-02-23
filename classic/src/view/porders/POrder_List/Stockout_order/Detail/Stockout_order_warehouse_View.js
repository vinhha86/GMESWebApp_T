Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_warehouse_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_order_warehouse_View',
    id: 'Stockout_order_warehouse_View',
    controller: 'Stockout_order_warehouse_ViewController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    bind: {
        store: '{WarehouseStore}'
    },
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Ảnh',
        locked: true,
        dataIndex: 'imgproduct',
        width: 45,
        textAlign: 'center',
        renderer: function (value, meta, record) {
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,' + value + '">';
        }
    }, {
        locked: true,
        text: 'Mã NPL',
        dataIndex: 'material_product_code',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var c = record.get('status');
            if (c == 0) {
                metaData.tdCls = 'process-free';
            } else if (c == 1) {
                metaData.tdCls = 'process-granted';
            }
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        },
        summaryRenderer: function () {
            return '<div style="font-weight: bold; color:red;"> Tổng</div>';
        }
    }, {
        text: 'Màu NPL',
        dataIndex: 'color_name',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'width',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Số lot',
        dataIndex: 'lotnumber',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Cây vải',
        dataIndex: 'packageid',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        },
        summaryType: 'count',
        summaryRenderer: 'renderCount'
    }, {
        text: 'Chiều dài',
        dataIndex: 'met',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return Ext.util.Format.number(parseFloat(value), '0,000.00');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, {
        text: 'ĐVT',
        dataIndex: 'unit_name',
        width: 100
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Cây vải trong kho'
        },
        {
            xtype: 'radiogroup',
            itemId: 'radiofilter',
            bind: {
                value: '{type}'
            },
            items: [
                { boxLabel: 'Tồn theo đơn', name: 'type', inputValue: '1', checked: true, width: 120 },
                { boxLabel: 'Tồn theo Buyer', name: 'type', inputValue: '2', width: 120 },
                { boxLabel: 'Tồn toàn kho', name: 'type', inputValue: '3' }]
        },
            '->',
        {
            xtype: 'button',
            itemId: 'btnHideWarehouse',
            ui: 'header',
            margin: '10 5 0 0',
            text: 'Ẩn',
            iconCls: 'x-fa fa-eye'
        }
        ]
    }, {
        dock: 'left',
        layout: 'vbox',
        border: true,
        items:
            [
                {
                    flex: 1
                },
                { height: 10 },
                {
                    xtype: 'button',
                    tooltip: 'Thêm vào yêu cầu',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId: 'btnAddmat',
                    weight: 30,
                    bind: {
                        disabled: '{isLock}'
                    }
                },
                {
                    flex: 1
                }
            ]
    }]
});

