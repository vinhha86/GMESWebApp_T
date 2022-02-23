Ext.define('GSmartApp.view.stockin.Stockout_POLINE', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_POLINE',
    itemId: 'Stockout_POLINE',
    controller: 'Stockout_POLINECotroller',
    viewModel: {
        type: 'Stockout_POLINE_ViewModel'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    bind: {
        store: '{POLineStore}'
    },
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Buyer',
        dataIndex: 'buyerName',
        flex: 1
    },{
        text: 'Vendor',
        dataIndex: 'vendorName',
        flex: 1
    },{
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1
    }, {
        text: 'Sản phẩm',
        dataIndex: 'productbuyercode',
        width: 150
    }, {
        text: 'Ngày giao',
        xtype: 'datecolumn',
        format: 'd/m/y',
        dataIndex: 'shipdate',
        width: 120
    }, {
        xtype: 'numbercolumn',
        format: '0,000',
        text: 'SL',
        dataIndex: 'po_quantity',
        width: 60,
        align: 'right'
    },{
        text: 'Cảng đến',
        dataIndex: 'portTo',
        width: 100
    },{
        text: 'Cảng đi',
        dataIndex: 'portFrom',
        width: 100
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        style: "background-color : white;",
        items: [{
            xtype: 'textfield',
            itemId: 'POBuyer_txtField',
            fieldLabel: 'PO Buyer',
            margin: 5,
            bind: {
                value: '{po_buyer}'
            },
            enableKeyEvents : true,
        }, {
            xtype: 'button',
            itemId: 'btnTimKiem',
            tooltip: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            margin: 5
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1,
            border: false
        }, {
            xtype: 'button',
            text: 'Chọn',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-check'
        }, {
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

