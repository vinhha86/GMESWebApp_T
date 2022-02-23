Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_POLINE',
    itemId: 'Stockin_POLINE',
    controller: 'Stockin_POLINE_Controller',
    // viewModel: {
    //     type: 'Stockout_POLINE_ViewModel'
    // },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE',
    //     checkOnly: true
    // },
    bind: {
        store: '{POLineStore}'
    },
    columns: [
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: 'Buyer',
            dataIndex: 'buyerName',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },{
            text: 'Vendor',
            dataIndex: 'vendorName',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },{
            text: 'PO Buyer',
            dataIndex: 'po_buyer',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        // {
        //     text: 'Sản phẩm',
        //     dataIndex: 'productbuyercode',
        //     width: 150
        // }, 
        {
            text: 'Ngày giao',
            xtype: 'datecolumn',
            format: 'd/m/y',
            dataIndex: 'shipdate',
            width: 120,
            // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            //     metaData.tdAttr = 'data-qtip="' + value + '"';
            //     return value;
            // }
        },
        // {
        //     xtype: 'numbercolumn',
        //     format: '0,000',
        //     text: 'SL',
        //     dataIndex: 'po_quantity',
        //     width: 60,
        //     align: 'right'
        // }
]
});

