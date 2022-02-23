Ext.define('GSmartApp.view.pcontract.All_line_Edit_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'All_line_Edit_View',
    id: 'All_line_Edit_View',
    controller: 'All_line_Edit_ViewController',
    viewModel: {
        type: 'All_line_Edit_ViewModel'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractProductPOStore}'
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
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu'
            }
        ]
    }, {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Buyer',
        dataIndex: 'buyerName',
        width: 110
    },
    {
        text: 'Vendor',
        dataIndex: 'vendorName',
        width: 110
    },
    {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.status == 0) {
                metaData.tdCls = "po_accept";
            }
            else {
                if (record.get('po_quantity') != record.get('amount_org')) {
                    metaData.tdCls = "po_wrongamount"
                }
            }
            return value;
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                focus: 'onFocus'
            }
        }
    }, {
        text: 'PO Vendor',
        dataIndex: 'po_vendor',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                focus: 'onFocus'
            }
        }
    }, {
        text: 'SL',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 70, editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            maskRe: /[0-9.]/,
            listeners: {
                focus: 'onFocus'
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'SL chi tiết',
        align: 'right',
        dataIndex: 'po_quantity_detail',
        width: 70, editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            maskRe: /[0-9.]/,
            listeners: {
                focus: 'onFocus'
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 110,
        editor: {
            xtype: 'datefield',
            format: 'd/m/y',
            selectOnFocus: true,
            editable: false,
            listeners: {
                focus: 'onFocus'
            }
        }
    }
    ],
    dockedItems: [{
        dock: 'bottom',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thoát',
            iconCls: 'x-fa fa-window-close',
            itemId: 'btnThoat',
            bind: {
                disabled: '{isEdit}'
            }
        }]
    }
    ]
});

