Ext.define('GSmartApp.view.handover.HandoverPackToStock_Edit_POrder', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackToStock_Edit_POrder',
    itemId: 'HandoverPackToStock_Edit_POrder',
    controller: 'HandoverPackToStock_Edit_POrderCotroller',
    viewModel: {
        type: 'HandoverPackToStock_ViewModel'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{porderStore}'
    },
    reference: 'HandoverPackToStock_Edit_POrder',
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã lệnh',
        dataIndex: 'ordercode',
        flex: 1
    }, {
        text: 'Tên SP',
        dataIndex: 'productcode',
        width: 150
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1
    }, {
        text: 'Ngày giao hàng',
        xtype: 'datecolumn',
        format: 'd/m/y',
        dataIndex: 'orderdate',
        width: 120
    }, {
        xtype: 'numbercolumn',
        format: '0,000',
        text: 'SL',
        dataIndex: 'totalorder',
        width: 60,
        align: 'right'
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        style: "background-color : white;",
        items: [{
            xtype: 'textfield',
            fieldLabel: 'PO Buyer',
            margin: 5,
            bind: {
                value: '{ordercode}'
            }
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
            iconCls: 'x-fa fa-save'
        }, {
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

