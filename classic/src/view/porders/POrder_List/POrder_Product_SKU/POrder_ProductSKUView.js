Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_ProductSKUView',
    id: 'POrder_ProductSKUView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_ProductSKUViewController',
    reference: 'POrder_ProductSKUView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        bind: {
            hidden: '{isProductSkuSelectHidden}'
        }
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: 'PO: {name}'
    },{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{porderSKUStore}'
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
        align: 'end',
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    bind: {
                        readOnly: '{!isEditSL}'
                    }
                }
            })
        },
    }, {
        text: 'Đã phân chuyền',
        dataIndex: 'pquantity_granted',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 125,
        align: 'end'
    }, {
        text: 'Còn lại',
        dataIndex: 'pquantity_ungranted',
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
            value: 'Chi tiết màu cỡ'
        },
            '->'
            , {
            xtype: 'button',
            itemId: 'btnThemSKU',
            ui: 'header',
            hidden: true,
            margin: '10 5 0 0',
            tooltip: 'Thêm màu, cỡ',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

