Ext.define('GSmartApp.view.tagencode.Encode_Edit_SKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'Encode_Edit_SKU',
    border: true,
    controller: 'Encode_Edit_SKU_Controller',
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false
    },
    bind: '{warehouse_encode.warehouse_encode_d}',
    // bind: {
    //     store: '{Encode_sku_Store}'
    // },
    title:'Danh sách sản phẩm',
    columns: [
        { header: 'Mã vạch', dataIndex: 'skucode', width: 120},
        { header: 'Mã SP', dataIndex: 'product_code', width: 70},
        { header: 'Tên SP', dataIndex: 'skuname', flex: 1, 
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }},
        { header: 'Màu', dataIndex: 'color_name', width: 70},
        { header: 'Cỡ', dataIndex: 'size_name', width: 50},
        { header: 'SL', dataIndex: 'totalencode', width: 50, align:'center'}
    ]
});
