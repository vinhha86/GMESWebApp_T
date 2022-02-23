Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantSKUView',
    id: 'POrder_List_GrantSKUView',
    IdPOrder: 0,
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    controller: 'POrder_List_GrantSKUViewController',
    reference: 'POrder_List_GrantSKUView',
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
        mode: 'MULTI'
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: 'PO: {name}'
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    bind: {
        store: '{POrder_ListGrantSKUStore}'
    },
    // title: 'Chi tiết màu, cỡ',
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },
    // {
    //     text: 'SKU',
    //     dataIndex: 'skucode',
    //     flex: 1,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // }, 
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
        width: 60,
    }, {
        text: 'SL',
        dataIndex: 'grantamount',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'Không được để trống số lượng',
                itemId: 'txtgrantamount',
                maskRe: /[0-9]/,
            }
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 60,
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
            value: 'Chi tiết màu cỡ tổ chuyền '
        },
            '->'
            , {
            xtype: 'button',
            itemId: 'btnThemSKU',
            ui: 'header',
            margin: '10 5 0 0',
            tooltip: 'Thêm màu, cỡ',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

