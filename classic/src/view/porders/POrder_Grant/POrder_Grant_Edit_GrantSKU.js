Ext.define('GSmartApp.view.porders.POrder_Grant_Edit_GrantSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Edit_GrantSKU',
    id:'POrder_Grant_Edit_GrantSKU',
    title: 'Chi tiết phân chuyền',
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
        store:'{grantedSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 70},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'grantamount', width: 80},
    ]    
});

