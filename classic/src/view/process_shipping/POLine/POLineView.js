Ext.define('GSmartApp.view.process_shipping.POLine.POLineView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POLineView',
    id: 'POLineView',
    controller: 'POLineViewController',
    reference: 'POLineView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        enableTextSelection: true
    },
    bind: {
        store: '{POLineStore}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        hidden: true,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenuShow'
            },
        ]
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.ismap) {
                metaData.tdCls = "po_offer";
            }
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterPO',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterPOKeyup',
                buffer: 500
            }
        },
        summaryType: 'count',
        summaryRenderer: function (value, record) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + ' (line)</div>';
        }
    }, {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: function (value, meta, record) {
            if (null == value) value = 0;
            return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    },
    {
        text: 'Đóng gói',
        width: 150,
        dataIndex: 'packing_method'
    },
    {
        text: 'PT vận chuyển',
        width: 150,
        dataIndex: 'shipmode_name'
    },
    {
        text: 'Cảng xếp hàng',
        width: 100,
        dataIndex: 'portFrom'
    },
    {
        text: 'ĐVT',
        dataIndex: 'totalpair',
        width: 60,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'vbox',
        items: [{
            layout: 'hbox',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Làm mới danh sách',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onReload'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenList'
            }, {
                xtype: 'combo',
                fieldLabel: 'Mã sản phẩm',
                bind: {
                    store: '{ProductStore}',
                    value: '{productid_link}'
                },
                displayField: 'buyercode',
                valueField: 'id',
                margin: 2,
                minChars: 4,
                queryMode: 'remote',
                queryParam: 'buyercode',
                itemId: 'cmbProduct'
            }]
        },
        {
            layout: 'hbox',
            items: [
                {
                    xtype: 'combo',
                    emptyText: 'Mầu sản phẩm',
                    bind: {
                        store: '{MauSanPhamStore}',
                        value: '{colorid_link}'
                    },
                    displayField: 'value',
                    margin: 2,
                    valueField: 'id',
                    queryMode: 'local',
                    width: 250,
                    anyMatch: true,
                    itemId: 'cmbMauSP',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            weight: -1,
                            handler: 'onClearFilter'
                        }
                    }
                },
                {
                    xtype: 'combo',
                    emptyText: 'Dải cỡ',
                    bind: {
                        store: '{DaiCoSanPhamStore}',
                        value: '{sizesetid_link}'
                    },
                    displayField: 'name',
                    margin: 2,
                    valueField: 'id',
                    queryMode: 'local',
                    width: 250,
                    anyMatch: true,
                    itemId: 'cmbDaiCoSP',
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            weight: -1,
                            handler: 'onClearFilterDaiCo'
                        }
                    }
                }
            ]
        }
        ]
    },
    {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            margin: 2,
            iconCls: 'x-fa fas fa-link brownIcon',
            text: 'Maps',
            itemId: 'btnMap'
        }, {
            xtype: 'button',
            margin: 2,
            iconCls: 'x-fa fas fa-undo brownIcon',
            text: 'Hủy Map',
            hidden: true,
            itemId: 'btnHuyMap'
        },
            '->', {
            html: '<div class="color-box">'
                + '<div class="color-square po_offer"></div>&nbspĐã map'
                + '</div>',
            margin: 2
        }]
    }
    ]
});

