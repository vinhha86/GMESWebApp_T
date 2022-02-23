Ext.define('GSmartApp.view.pcontract.PContract_Bom.PContract_Bom_PO_SKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom_PO_SKUView',
    id: 'PContract_Bom_PO_SKUView',
    controller: 'PContract_Bom_PO_SKUViewCotroller',
    IdPcontract: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
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
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true,
        injectCheckbox: 'first'
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [{
        text: 'SKU',
        dataIndex: 'skuCode',
        width: 150,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return 'Tổng';
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Màu',
        flex: 1,
        dataIndex: 'mauSanPham',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        width: 65
    }, {
        text: 'Số lượng',
        dataIndex: 'pquantity',
        width: 80,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'combo',
            bind: {
                store: '{PContractProduct_PO_Store}',
                value: '{cmb_productid_link}'
            },
            margin: 5,
            width: 400,
            valueField: 'id',
            displayField: 'buyercode',
            queryMode: 'local',
            anyMatch: true,
            fieldLabel: 'Chi tiết màu, cỡ sản phẩm',
            labelWidth: 200,
            itemId: 'cmbSanPham',
            labelStyle: "font-weight: bold; font-size: 14px; color: black"
        }
        ]
    }]
});

