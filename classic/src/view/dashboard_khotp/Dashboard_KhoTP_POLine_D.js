Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_KhoTP_POLine_D',
    id: 'Dashboard_KhoTP_POLine_D',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [
    {
        text: 'SKU',
        dataIndex: 'skuCode',
        flex: 1
    },
    // {
    //     text:'Mã vạch',
    //     dataIndex:'skuBarCode',
    //     flex: 1
    // },
    {
        text: 'Màu',
        // flex: 1,
        width: 110,
        dataIndex: 'mauSanPham',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, 
    {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        width: 50
    }, 
    {
        text: 'SL đơn',
        dataIndex: 'pquantity_porder',
        width: 65,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    },
    {
        text: 'SL SX',
        dataIndex: 'pquantity_production',
        width: 65,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, 
    {
        text: 'SL mẫu',
        dataIndex: 'pquantity_sample',
        width: 65,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, 
    {
        text: 'SL Tổng',
        dataIndex: 'pquantity_total',
        width: 68,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    },
    {
        text: 'Tồn kho',
        dataIndex: 'pquantity_onhand_end',
        width: 65,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }     
    ],
    // dockedItems: [{
    //     dock: 'top',
    //     xtype: 'toolbar',
    //     padding: '0 0 10 5',
    //     height: 40,
    //     items: [{
    //         xtype: 'displayfield',
    //         fieldStyle: "font-weight: bold; font-size: 14px; color: black",
    //         labelWidth: 0,
    //         bind: {
    //             value: 'Chi tiết màu, cỡ'
    //         }
    //     },
    //     ]
    // }]
});

