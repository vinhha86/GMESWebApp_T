Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_VIew', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom_PO_VIew',
    id: 'PContract_Bom_PO_VIew',
    controller: 'PContract_Bom_PO_VIewController',
    bind: {
        store: '{PContractBom_PO_Store}'
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
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Chú thích',
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
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Danh sách PO Line'
        }
        ]
    }]
})