Ext.define('GSmartApp.view.RFID.demoRFID.stock.stockin.StockinView', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockinView',
    id: 'StockinView',
    controller: 'StockinViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{StockinStore}'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    columns: [{
        text: 'Mã SP',
        dataIndex: 'code',
        flex: 1
    },
    {
        text: 'Tên SP',
        dataIndex: 'name',
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'quantity',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum'
    }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Kho',
                bind: {
                    store: '{inv_store}',
                    value: '{id_invstore}'
                },
                displayField: 'storename',
                valueField: 'id',
                margin: 5
            },
            {
                xtype: 'combo',
                valueField: 'deviceid',
                displayField: 'devicename',
                margin: 5,
                fieldLabel: 'Thiết bị',
                bind: {
                    store: '{device_store}',
                    value: '{deviceid}'
                },
                itemId: 'cmbDevice'
            }, {
                margin: 5,
                text: "Start",
                iconCls: 'x-fa fa-play',
                xtype: 'button',
                itemId: 'btnStart',
                bind: {
                    disabled: '{isStart}'
                }
            }, {
                margin: 5,
                text: "Stop",
                iconCls: 'x-fa fa-stop',
                xtype: 'button',
                userCls: 'red-button',
                itemId: 'btnStop',
                bind: {
                    disabled: '{!isStart}'
                }
            },
            {
                margin: 5,
                text: "Nhập kho",
                iconCls: 'x-fa fa-plus',
                xtype: 'button',
                itemId: 'btnLuu',
                bind: {
                    disabled: '{isStart}'
                }
            }
        ]
    }
    ]
});

