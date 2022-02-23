Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_coloramount_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_order_coloramount_View',
    id: 'Stockout_order_coloramount_View',
    controller: 'Stockout_order_coloramount_ViewController',
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
        store: '{Stockout_order_color_amount_Store}'
    },
    columns: [
        {
            text: 'Màu SP',
            dataIndex: 'color_name',
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Cỡ SP',
            dataIndex: 'size_name',
            width: 80,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'SL',
            dataIndex: 'amount',
            width: 60,
            align: 'right',
            editor: {
                xtype: 'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            renderer: function (value, metaData, record) {
                return Ext.util.Format.number(value, '0,000');
            }
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        height: 45,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'SLSP cần SX'
        }
        ]
    }]
});

