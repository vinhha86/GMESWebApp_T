Ext.define('GSmartApp.view.pcontract.ListPO_ConfimView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ListPO_ConfimView',
    id: 'ListPO_ConfimView',
    controller: 'ListPO_ConfimViewController',
    viewModel: {
        type: 'ListPO_ConfimViewModel'
    },
    bind: {
        store: '{PContractPOStore}'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE',
        checkOnly: true
    },
    columns: [{
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'POFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOFilterKeyup',
                buffer: 500
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Style',
        dataIndex: 'comment',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 100
    }, {
        text: 'Số lượng',
        dataIndex: 'po_quantity',
        align: 'right',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Cảng đi',
        dataIndex: 'portFrom',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Cảng đến',
        dataIndex: 'portTo',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 3,
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, {
            xtype: 'button',
            margin: 3,
            text: 'Xóa',
            itemId: 'btnXoa',
            iconCls: 'x-fa fa-trash'
        }]
    }]
})