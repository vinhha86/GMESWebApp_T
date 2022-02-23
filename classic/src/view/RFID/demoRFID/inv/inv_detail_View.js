Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_detail_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'inv_detail_View',
    id: 'inv_detail_View',
    controller: 'inv_detail_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{inv_detail_store}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-filter',
                handler: 'onViewBarcode'
            },
        ]
    }, {
        text: 'Mã sản phẩm',
        dataIndex: 'prodcode',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filtercode',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterCodeKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Tên sản phẩm',
        dataIndex: 'prodname',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filtername',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterNameKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Lot',
        dataIndex: 'lot',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'filterlot',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterLotKeyup',
                buffer: 500
            }
        }
    },
    {
        text: 'Ngày hết hạn',
        dataIndex: 'expdate',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y')
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        layout: 'hbox',
        items: [
            {
                xtype: 'displayfield',
                fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                bind: {
                    value: 'Danh sách sản phẩm trong kho: "{inv.storename}"'
                }
            }
        ]
    }
    ]
});

