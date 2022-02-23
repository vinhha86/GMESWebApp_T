Ext.define('GSmartApp.view.invoice.invoice_pcontractlist.invoice_pcontractlist', {
    extend: 'Ext.grid.Panel',
    xtype: 'invoice_pcontractlist',
    id: 'invoice_pcontractlist',
    reference: 'invoice_pcontractlist',
    controller: 'invoice_pcontractlist_Controller',
    viewModel:{
        type: ''
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{PContractStore}'
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
        { header: 'Đơn hàng', dataIndex: 'contractcode', flex: 1},
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
});

