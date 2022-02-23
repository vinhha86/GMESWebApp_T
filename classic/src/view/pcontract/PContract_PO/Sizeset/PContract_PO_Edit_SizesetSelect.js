Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetSelect', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_SizesetSelect',
    id: 'PContract_PO_Edit_SizesetSelect',
    controller: 'PContract_PO_Edit_SizesetSelectController',
    viewModel: 'PContract_PO_Edit_ViewModel',
    pcontract_po: null,
    productid_link: null,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{SizeSetStore}'
    },
    columns: [{
        text: 'Dải cỡ',
        dataIndex: 'name',
        flex: 1
    }, {
        text: 'Cỡ',
        dataIndex: 'attrValues',
        flex: 1
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            border: false,
            flex : 1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

