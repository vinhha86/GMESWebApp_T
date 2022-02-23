Ext.define('GSmartApp.view.dm_tinhthanh.QuanHuyenView', {
    extend: 'Ext.grid.Panel',
    xtype: 'QuanHuyenView',
    id: 'QuanHuyenView',

    controller: 'QuanHuyenViewController',
    bind: {
        title: '{showTitle_Huyen}',
        store: '{org_huyen_store}'
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
            reference: 'TenHuyen_filter',
            listeners: {
                keyup: 'onTenHuyen_filter',

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
            reference: 'MaHuyen_filter',
            listeners: {
                keyup: 'onMaHuyen_filter',

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
                itemId: 'onThem',
                iconCls: 'x-fa fa-plus',
                margin: 2
            }, ,
            {
                xtype: 'textfield',
                emptyText: 'Tên quận, huyện',
                flex: 1,
                margin: 2,
                bind: '{Huyen.name}'
            },
            {
                xtype: 'textfield',
                emptyText: 'Mã quận, huyện',
                flex: 1,
                margin: 2,
                bind: '{Huyen.code}'
            }
        ]
    }
    ]
})