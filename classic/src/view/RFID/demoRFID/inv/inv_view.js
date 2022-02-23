Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_view', {
    extend: 'Ext.grid.Panel',
    xtype: 'inv_view',
    id: 'inv_view',
    controller: 'inv_viewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    bind: {
        store: '{inv_store}'
    },
    columns: [{
        text: 'Mã kho',
        dataIndex: 'codename',
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
        text: 'Tên kho',
        dataIndex: 'storename',
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
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'displayfield',
                fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                value: 'Danh sách kho'
            },
            '->',
            {
                xtype: 'button',
                itemId: 'btnAddInv',
                tooltip: 'Thêm kho',
                iconCls: 'x-fa fa-plus'
            }
        ]
    }
    ]
});

