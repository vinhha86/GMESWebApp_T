Ext.define('GSmartApp.view.process_shipping.Balance.Balance_mat_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Balance_mat_View',
    id: 'Balance_mat_View',
    controller: 'Balance_mat_ViewController',
    reference: 'Balance_mat_View',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    bind: {
        store: '{SKUBalanceStore_Mat}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    columns: [
        {
        text: 'Mã NPL', 
        width: 100,
        dataIndex: 'mat_sku_code'
    },
    {
        text: 'Thành phần vải',
        dataIndex: 'mat_sku_desc',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Màu SP', 
        dataIndex: 'mat_sku_color_name',
        width: 85
    },
    // {
    // 	text: 'Cỡ', 
    // 	dataIndex: 'mat_sku_size_name',
    // 	width: 50
    // },
    {
        text: 'ĐVT', 
        dataIndex: 'mat_sku_unit_name',
        width: 70
    },
    {
        text: 'Định mức',
        dataIndex: 'mat_sku_bom_amount',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.0000',
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    },				
    {
        text: '%TH',
        dataIndex: 'mat_sku_bom_lostratio',
        width: 55,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            return value+" %";
        }
    },
    {
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Nhu cầu', 
        align:'right',
        dataIndex: 'mat_sku_demand',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 80
    },
    // {
    // 	xtype: 'numbercolumn',
    // 	format:'0,000',
    // 	text: 'Đặt hàng', 
    // 	align:'right',
    // 	summaryType: 'sum',
    // 	summaryRenderer: 'renderSum',
    // 	dataIndex: 'mat_sku_invoice',
    // 	width: 80
    // },
    // {
    // 	text:'Dự kiến về',
    // 	dataIndex:'mat_sku_invoice_date',
    // 	renderer: Ext.util.Format.dateRenderer('d/m/y'),
    // 	width: 75
    // },
    {
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Nhập kho', 
        align:'right',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        dataIndex: 'mat_sku_stockin',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Chênh lệch', 
        align:'right',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        dataIndex: 'mat_sku_dif',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Xuất kho', 
        align:'right',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        dataIndex: 'mat_sku_stockout',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        format:'0,000',
        text: 'Tồn', 
        align:'right',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        dataIndex: 'in_stock',
        width: 80
    },
    {
        text: 'Lệnh xuất vải',
        align: 'right',
        dataIndex: 'stockout_list',
        width: 120,
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'button',
            itemId: 'btnAddStockoutOrder',
            ui: 'header',
            margin: '10 5 0 0',
            tooltip: 'Tạo yêu cầu xuất',
            text: 'Yêu cầu xuất NPL',
            iconCls: 'x-fa fa-plus'
        }
        ]
    }]
});

