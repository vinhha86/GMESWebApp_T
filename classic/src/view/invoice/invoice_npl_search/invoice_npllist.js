Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_npllist', {
    extend: 'Ext.grid.Panel',
    xtype: 'invoice_npllist',
    id: 'invoice_npllist',
    reference: 'invoice_npllist',
    // controller: 'HandoverDetailPorderSearchController',
    viewModel:{
        // type:'HandoverDetailPorderSearchViewModel'
    },
    features: [{
        ftype:'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip:""
    }],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bind:{
        // store:'{SkuStore}'
    },
    scrollable: true,
    border: true,
    width: '100%',
    height: '100%',
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
        { header: 'Mã NPL', dataIndex: 'mat_sku_code', width: 200,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'maNPLFilter',
                width: 1966,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaNPLFilterKeyup',
                    buffer: 500
                }
            }
        },
        { header: 'Nguyên phụ liệu', dataIndex: 'mat_sku_name', flex: 1},
        { header: 'Màu NPL', dataIndex: 'mat_sku_color_name', flex: 1},
        { header: 'Cỡ khổ', dataIndex: 'mat_sku_size_name', width: 70},
    ],
});

