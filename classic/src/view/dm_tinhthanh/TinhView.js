Ext.define('GSmartApp.view.dm_tinhthanh.TinhView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TinhView',
    id: 'TinhView',

    title: 'Danh sách tỉnh thành',

    controller: 'TinhViewController',

    bind: {
        store: '{org_tinh_store}'
    },

    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
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
            reference: 'TenTinh_filter',
            listeners: {
                keyup: 'onTenTinh_filter',

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
            reference: 'MaTinh_filter',
            listeners: {
                keyup: 'onMaTinh_filter',

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
                itemId: 'Them'
            },
            {
                xtype: 'textfield',
                emptyText: 'Tên tỉnh thành',
                flex: 1,
                margin: 2,
                bind: '{Tinh.name}'
            },
            {
                xtype: 'textfield',
                emptyText: 'Mã tỉnh thành',
                flex: 1,
                margin: 2,
                bind: '{Tinh.code}'
            }
        ]
    }
    ]
})