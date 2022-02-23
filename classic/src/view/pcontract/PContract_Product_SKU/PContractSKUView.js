Ext.define('GSmartApp.view.pcontract.PContractSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractSKUView',
    id: 'PContractSKUView',
    controller: 'PContractSKUViewCotroller',
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
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'SKU',
        dataIndex: 'skuCode',
        flex: 1,
        // width: 150,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            var viewmodel = Ext.getCmp('PContractSKUView').getController().getViewModel();
            var ProductSKUSummaryCssStyle = viewmodel.get('ProductSKUSummaryCssStyle');
            return ProductSKUSummaryCssStyle + 'Tổng' + '</div>';
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    // {
    //     text:'Mã vạch',
    //     dataIndex:'skuBarCode',
    //     flex: 1
    // },
    {
        text: 'Màu',
        // flex: 1,
        width: 150,
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
        text: 'SL đơn',
        dataIndex: 'pquantity_porder',
        width: 62,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        },
        summaryType: 'sum',
        // summaryRenderer: function(value, summaryData, dataIndex) {
        //     return '<div style="color:red; font-weight: bold; align: right">'+ Ext.util.Format.number(value, '0,000') ;
        // },
        summaryRenderer: 'renderSum'
    }, 
    {
        text: 'SL SX',
        dataIndex: 'pquantity_production',
        width: 62,
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
        summaryRenderer: function (value, summaryData, dataIndex) {
            var viewmodel = Ext.getCmp('PContractSKUView').getController().getViewModel();
            var ProductSKUSummaryCssStyle = viewmodel.get('ProductSKUSummaryCssStyle');
            return ProductSKUSummaryCssStyle + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, {
        text: 'SL mẫu',
        dataIndex: 'pquantity_sample',
        width: 65,
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
        summaryRenderer: function (value, summaryData, dataIndex) {
            var viewmodel = Ext.getCmp('PContractSKUView').getController().getViewModel();
            var ProductSKUSummaryCssStyle = viewmodel.get('ProductSKUSummaryCssStyle');
            return ProductSKUSummaryCssStyle + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, {
        text: 'SL Tổng',
        dataIndex: 'pquantity_total',
        width: 70,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: function (value, summaryData, dataIndex) {
            var viewmodel = Ext.getCmp('PContractSKUView').getController().getViewModel();
            var ProductSKUSummaryCssStyle = viewmodel.get('ProductSKUSummaryCssStyle');
            return ProductSKUSummaryCssStyle + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    },],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            bind: {
                value: 'Chi tiết màu, cỡ'
            }
        },
        {
            xtype: 'combo',
            bind: {
                store: '{PContractProduct_PO_Store}'
            },
            width: 300,
            valueField: 'id',
            displayField: 'code_amount',
            queryMode: 'local',
            anyMatch: true,
            fieldLabel: 'Sản phẩm',
            labelWidth: 70,
            margin: '5 5 5 20',
            itemId: 'cmbSanPham',
            anyMatch: true
        },
            '->'
            ,
        {
            xtype: 'button',
            itemId: 'btnThemSKU',
            ui: 'header',
            tooltip: 'Thêm SKU',
            iconCls: 'x-fa fa-plus',
            handler: 'onThemSKU',
            bind: {
                disabled: '{isDisable_btnThemSKU}',
                hidden: '{isHiddenThemSKU}'
            }
        },
        {
            xtype: 'button',
            // text: 'Chốt màu,cỡ',
            itemId: 'btnConfirmSKU',
            // ui: 'header',
            tooltip: 'Chốt chi tiết màu cỡ',
            iconCls: 'x-fa fa-check greenIcon',
            bind: {
                disabled: '{isDisable_btnConfirmSKU}'
            }
        }
        ]
    }]
});

