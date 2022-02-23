Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_PContractPOView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_PContractPOView',
    id: 'POrder_List_PContractPOView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_PContractPOViewController',
    reference: 'POrder_List_PContractPOView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{PContract_PO}'
    },
    columns: [{
    //     text: 'STT',
    //     width: 45,
    //     xtype: 'rownumberer',
    //     align: 'center'
    // }, {
        text: 'PO',
        dataIndex: 'po_buyer',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Ngày giao hàng',
        dataIndex: 'shipdate',
        width: 90,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        text: 'SL',
        dataIndex: 'pcontractPoProductSkuQuantityTotal',
        // flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000') + '"';
            return Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 65,
        align: 'end'
    },
    {
        text: 'Tổ SX',
        dataIndex: 'productionlines',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }
    ]
});

