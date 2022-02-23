Ext.define('GSmartApp.view.porders.POrder_Grant_Edit_OrderSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Edit_OrderSKU',
    id:'POrder_Grant_Edit_OrderSKU',
    title: 'Chi tiết lệnh',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bind:{
        store:'{porderSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 70},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80},
    ]    
});

