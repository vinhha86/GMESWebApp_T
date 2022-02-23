Ext.define('GSmartApp.view.sku.SkuList', {
    extend: 'Ext.grid.Panel',
    xtype: 'SkuList',
    id: 'SkuList',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Sku'
    ],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    layout: 'fit',
    border: true,
    scrollable: true,
    bind: {
        store: '{SkuStore}'
    },
    flex: 1,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    columns: [
        {
            header: 'SKU', dataIndex: 'code', width: 100,
            summaryType: 'count',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        // { header: 'Mã vạch', dataIndex: 'barcode', width: 110,
        //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     }
        // },
        {
            header: 'Màu', dataIndex: 'color_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'FilterMauSP',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterMauSP',
                    buffer: 500
                }
            }
        },
        { header: 'Size', dataIndex: 'size_name', flex: 1 }
        //{ header: 'Ngày kiểm vải', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/y'), flex: 1},                             
    ],
    // dockedItems: [{
    //     dock: 'top',
    //     xtype: 'toolbar',
    //     items: [
    //         // {
    //         //     xtype: 'radiogroup',
    //         //     reference:'skusearch_rdoSkuType',
    //         //     cls: 'x-check-group-alt',
    //         //     items: [
    //         //         { boxLabel: 'Chính ', inputValue: 20, checked: true},
    //         //         { boxLabel: 'Lót ', inputValue: 21, margin: '0 0 0 5'},
    //         //         { boxLabel: 'Phối ', inputValue: 22, margin: '0 0 0 5'},
    //         //         { boxLabel: 'Mex ', inputValue: 23, margin: '0 0 0 5'},
    //         //  ]
    //         // },             
    //         {
    //             xtype:  'combo',
    //             reference:'skusearch_cboProductType',
    //             flex: 1,
    //             margin: 2,
    //             valueField: 'id',
    //             displayField: 'name',
    //             queryMode: 'local',
    //             fieldLabel: "Loại nguyên phụ liệu:",
    //             allowBlank: false,
    //             labelWidth: 150,
    //             blankText: 'Không được để trống',
    //             bind:{
    //                 store: '{ProductTypeStore}',
    //             }
    //         },                   
    //         {
    //             xtype: 'textfield',
    //             margin: '0 0 0 5',
    //             name: 'txtskucode',
    //             reference:'skusearch_txtskucode',
    //             fieldLabel: 'Thẻ vải:',
    //             width: 160,
    //             labelWidth: 50,
    //             hideLabel: false,
    //             // bind: {value:'{skucode}'}
    //         },
    //         {
    //             tooltip: 'Tìm thẻ vải',
    //             margin: '0 5 0 5',
    //             //text: 'Thêm thẻ vải',
    //             iconCls: 'x-fa fa-search',
    //             weight: 30,
    //             handler: 'onSearchTap'
    //         }             
    // ]
    // }],
    fbar: [{
        minWidth: 80,
        text: 'Chọn SKU',
        iconCls: 'x-fa fa-check',
        handler: 'onSelectButton'
    }, ,
        '->'],
    // listeners: {
    //     select: 'onStockoutDItemSelected'
    // }           
});
