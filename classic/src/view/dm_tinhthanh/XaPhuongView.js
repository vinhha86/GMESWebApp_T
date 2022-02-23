Ext.define('GSmartApp.view.dm_tinhthanh.XaPhuongView', {
    extend: 'Ext.grid.Panel',
    xtype: 'XaPhuongView',


    controller: 'XaPhuongViewController',
    bind: {
        title: '{showTitle_Xa}',
        store: '{org_xa_store}'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    rowLines: true,
    columnLines: true,
    columns: [{
        text: 'STT',
        xtype: 'rownumberer',
        width: 50,
        align: 'center'
    },
    {
        xtype: 'actioncolumn',
        width: 28,
        iconCls: 'x-fa fa-trash',
        handler: 'onXoa'
    },
    {
        text: 'Tên ',
        dataIndex: 'name',
        flex: 2,
        items: {
            xtype: 'textfield',
            margin: 1,
            width: '99%',
            enableKeyEvents: true,
            reference: 'TenXa_filter',
            listeners: {
                keyup: 'onTenXa_filter',

            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
        },

    }, {
        text: 'Mã ',
        dataIndex: 'code',
        flex: 1,
        items: {
            xtype: 'textfield',
            margin: 1,
            width: '99%',
            enableKeyEvents: true,
            reference: 'MaXa_filter',
            listeners: {
                keyup: 'onMaXa_filter',

            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
        },

    }
    ],

    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                xtype: 'button',
                text: 'Thêm',
                iconCls: 'x-fa fa-plus',
                margin: 2,
                itemId: 'onThem'
            },
            {
                xtype: 'textfield',
                emptyText: 'Tên xã, phường',
                flex: 1,
                margin: 2,
                bind: '{Xa.name}'
            },
            {
                xtype: 'textfield',
                emptyText: 'Mã xã, phường',
                flex: 1,
                margin: 2,
                bind: '{Xa.code}'
            }
        ]
    }
    ]
})