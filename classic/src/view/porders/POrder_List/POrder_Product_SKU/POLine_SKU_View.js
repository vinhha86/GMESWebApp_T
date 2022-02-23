Ext.define('GSmartApp.view.porders.POrder_List.POrder_Product_SKU.POLine_SKU_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POLine_SKU_View',
    id: 'POLine_SKU_View',
    controller: 'POLine_SKU_ViewController',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        bind: {
            hidden: '{isProductSkuSelectHidden}'
        }
    },
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: 'PO: {name}'
    },{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POLineSKU_Store}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
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
        text: 'Đã phân lệnh',
        dataIndex: 'pquantity_granted',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 120,
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
            value: 'Chi tiết màu cỡ PO Line'
        },
            '->'
            , {
            xtype: 'button',
            itemId: 'btnHideSKUPO',
            ui: 'header',
            margin: '10 35 0 0',
            tooltip: 'Ẩn',
            iconCls: 'x-fa fa-eye'
        }]
    },
    {
        dock: 'right',
        layout: 'vbox',
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

