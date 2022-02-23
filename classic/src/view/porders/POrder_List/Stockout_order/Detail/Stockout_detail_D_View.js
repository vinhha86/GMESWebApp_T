Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_detail_D_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_detail_D_View',
    id: 'Stockout_detail_D_View',
    controller: 'Stockout_detail_D_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{Stockout_order_d_Store}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu'
            }
        ]
    },
    {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120
    },
    {
        text: 'Tên NPL',
        dataIndex: 'materialName',
        width: 150
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        flex: 1
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 80
    }, {
        text: 'ĐVT',
        dataIndex: 'unitName',
        width: 70
    }, {
        text: 'SL giữ',
        dataIndex: 'totalyds_lock',
        width: 80,
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###.##');
            return value;
        },
        bind: {
            hidden: '{isHiddenYard}'
        }
    },
    {
        text: 'SL giữ',
        dataIndex: 'totalmet_lock',
        width: 80,
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###.##');
            return value;
        },
        bind: {
            hidden: '{!isHiddenYard}'
        }
    },
    {
        text: 'SL cây giữ',
        dataIndex: 'socaygiu',
        width: 80,
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###');
            return value;
        }
    },
    {
        text: 'Số cây YC',
        dataIndex: 'totalpackage',
        width: 60,
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###');
            return value;
        }
    },
    {
        text: 'SL YC',
        dataIndex: 'totalyds',
        width: 80,
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###.##');
            return value;
        },
        bind: {
            hidden: '{isHiddenYard}'
        }
    },
    {
        text: 'SL YC',
        dataIndex: 'totalmet',
        width: 80,
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            value = value == null ? "" : Ext.util.Format.number(parseFloat(value), '#,###.##');
            return value;
        },
        bind: {
            hidden: '{!isHiddenYard}'
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'button',
            tooltip: 'Thêm NPL',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_NPL'
        }, {
            xtype: 'button',
            tooltip: 'Tính SL tự động',
            iconCls: 'x-fa fa-calculator',
            itemId: 'btnCalculate'
        }]
    }]
});

