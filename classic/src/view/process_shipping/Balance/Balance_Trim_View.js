Ext.define('GSmartApp.view.process_shipping.Balance.Balance_Trim_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Balance_Trim_View',
    id: 'Balance_Trim_View',
    controller: 'Balance_Trim_ViewController',
    reference: 'Balance_Trim_View',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{POLineStore}'
    },
    columns: [{
        text: 'Mã phụ liệu',
        dataIndex: 'mat_sku_code',
        flex: 1
    },
    {
        text: 'SL Y/C',
        align: 'right',
        dataIndex: 'mat_sku_demand',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Dự kiến về',
        dataIndex: 'mat_sku_invoice_date',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Thực nhập',
        align: 'right',
        dataIndex: 'mat_sku_stockin',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'Thực xuất',
        align: 'right',
        dataIndex: 'mat_sku_stockout',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'Tồn',
        align: 'right',
        dataIndex: 'in_stock',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },
    {
        text: 'DS Lệnh xuất',
        align: 'right',
        dataIndex: 'stockout_list',
        width: 120,
    },    
    ]
});

