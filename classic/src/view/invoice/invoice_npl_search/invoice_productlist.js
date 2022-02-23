Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_productlist', {
    extend: 'Ext.grid.Panel',
    xtype: 'invoice_productlist',
    id: 'invoice_productlist',
    reference: 'invoice_productlist',
    // controller: 'HandoverDetailPorderSearchController',
    viewModel:{
        // type:'HandoverDetailPorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    bind:{
        store:'{PContractProductStore}'
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
        { header: 'Sản phẩm', dataIndex: 'productBuyerCode', flex: 1},
    ],
});

