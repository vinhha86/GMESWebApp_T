Ext.define('GSmartApp.view.process_shipping.SizeBreakdown.POLineSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'POLineSKU',
    id: 'POLineSKU',
    controller: 'POLineSKU_ViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POLineSKU_Store}'
    },
    columns: [{
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'FilterMauSP',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterMauSP',
                buffer: 500
            }
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        width: 50
    }, {
        text: 'SL',
        dataIndex: 'pquantity_total',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 60,
        align: 'end'
    }, {
        text: 'Còn lại',
        dataIndex: 'pquantity_free',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 65,
        align: 'end'
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            value: 'Chi tiết màu cỡ PO Line đã chốt'
        }]
    },
    {
        dock: 'right',
        layout: 'vbox',
        // hidden: true,
        border: true,
        items:
            [
                {
                    flex: 1
                },
                {
                    xtype: 'button',
                    tooltip: 'Thêm vào lệnh',
                    iconCls: 'x-fa fa-arrow-right',
                    weight: 30,
                    itemId: 'btnAddToPorder'
                    // handler: 'onPorder_AddSKU'
                },
                { height: 10 },
                {
                    xtype: 'button',
                    tooltip: 'Xoá khỏi lệnh',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId: 'btnDeleteFromPOrder',
                    weight: 30,
                    // handler: 'onPorder_AddSKU'
                },
                {
                    flex: 1
                }
            ]
    }]
});

