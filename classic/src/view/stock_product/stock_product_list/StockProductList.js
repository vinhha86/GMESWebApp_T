Ext.define('GSmartApp.view.stock.stock_material_list.StockProductList', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockProductList',
    itemId: 'StockProductList',
    reference: 'StockProductList',
    controller: 'StockProductListController',
    selModel: {
        selType: 'rowmodel',
        mode: 'SINGLE'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        enableTextSelection: true,
        rowLines: true
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    bind: {
        store: '{WarehouseStore}'
    },
    columns: [
        // {
        //     text: 'STT',
        //     width: 50,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // },
        {
            text: 'Mã hàng',
            dataIndex: 'skucode',
            // flex: 1,
            width: 180,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Màu',
            dataIndex: 'colorname',
            // flex: 1,
            width: 150,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'EPC',
            dataIndex: 'epc',
            flex: 1,
            // width: 150,
            align: 'center',
            renderer: function(value, meta, record){
                if(value == null){
                    return '';
                }
                // return value * 100;
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
]
});

