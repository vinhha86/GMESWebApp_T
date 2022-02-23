Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Price', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price',
    id: 'PContract_PO_Edit_Price',
    controller: 'PContract_PO_Edit_PriceController',
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
                edit: 'onPriceDItemEdit',
                beforeedit: 'onPriceDItemBeforeEdit'
            }
        }
    },

    // bind: '{PContract_PO_Edit_Sizeset.selection.pcontract_price_d}',
    bind: {
        store: '{Price_DStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        bind: {
            hidden: '{ishiddenActionColumn}'
        },
        items: [
            {
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xoá chi tiết giá',
                handler: 'onPriceD_Delete'
            },
            // {
            //     iconCls: 'x-fa fas fa-dollar',
            //     tooltip: 'Gợi ý giá',
            //     handler: 'onPriceGuide'
            // }
        ],
        // items: [
        //     {
        //         iconCls: 'x-fa fas fa-bars violetIcon',
        //         handler: 'onMenu_PriceList'
        //     },            
        // ]
    }, {
        text: 'Tên giá',
        dataIndex: 'fobprice_name',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
    }, {
        text: 'NCC',
        dataIndex: 'providerCode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            if (value == null) {
                return '';
            }
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            if (value == null) {
                return '';
            }
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
    },
    {
        text: 'ĐM',
        align: 'end',
        dataIndex: 'quota',
        width: 70,
        // width: 50,
        xtype: 'numbercolumn',
        format: '0.000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0 || value == null) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0.000') + '"';
            return Ext.util.Format.number(value, '0.000');
        }
    },
    {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        // flex:1,
        width: 70,
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0 || value == null) return "";
            return Ext.util.Format.number(value, '0.00') + " %"
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 70,
        // width: 50,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'combo',
                typeAhead: true,
                triggerAction: 'all',
                selectOnFocus: false,
                bind: {
                    store: '{UnitStore}',
                    // value: '{unitid_link}'
                },
                displayField: 'code',
                valueField: 'id',
                queryMode: 'local'
            }
        },
        renderer: 'renderUnit'
    },
    {
        text: 'Đơn giá',
        align: 'end',
        dataIndex: 'unitprice',
        width: 70,
        // width: 50,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0.0000') + '"';
            return Ext.util.Format.number(value, '0.0000')
        }
    },
    {
        text: 'Thành tiền',
        align: 'end',
        dataIndex: 'price',
        width: 80,
        // width: 50,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0) return "";
            metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0.0000') + '"';
            return Ext.util.Format.number(value, '0.0000')
        }
    },
    {
        text: 'FOB',
        xtype: 'checkcolumn',
        disabled: true,
        dataIndex: 'isfob',
        width: 45
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
            value: 'Chi tiết giá'
        }, {
            xtype: 'button',
            width: 20,
            itemId: 'btnDownloadTemp',
            ui: 'header',
            margin: '5 5 0 0',
            tooltip: 'Tải file mẫu',
            iconCls: 'x-fa fa-download'
        }, {
            xtype: 'filefield',
            buttonText: 'Tải báo giá',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUploadPO',
            width: 35,
            height: 32,
            margin: 3
        }, {
            xtype: 'button',
            width: 20,
            itemId: 'btnUploadTemp',
            ui: 'header',
            margin: '5 5 0 0',
            tooltip: 'Upload file giá',
            iconCls: 'x-fa fa-upload'
        },
            '->'
            ,
        {
            xtype: 'combobox',
            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
            fieldStyle: 'font-size:11px;text-align:right',
            width: 160,
            cls: 'inputBoxNarror',
            editable: false,
            fieldLabel: 'Loại tiền:',
            labelWidth: 50,
            bind: {
                store: '{CurrencyStore}',
                value: '{po.currencyid_link}'
            },
            displayField: 'name',
            valueField: 'id',
            reference: 'currencycombo',
            listeners: {
                select: 'onCurrencyItemSelected'
            }
        },
        {
            xtype: 'textfield',
            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
            fieldStyle: 'font-size:11px;text-align:right',
            width: 120,
            cls: 'inputBoxNarror',
            vtype: 'dollar',
            fieldLabel: 'Tỷ giá:',
            labelWidth: 50,
            bind: {
                value: '{po.exchangerate}'
            },
            listeners: {
                focusleave: 'onExchangeRateChange'
            }
        },
        {
            xtype: 'button',
            width: 20,
            itemId: 'btnThemMoiGia',
            ui: 'header',
            margin: '5 5 0 0',
            tooltip: 'Thêm chi tiết giá',
            iconCls: 'x-fa fa-plus'
        },
        {
            xtype: 'button',
            width: 20,
            itemId: 'btnPriceCopy',
            ui: 'header',
            margin: '1 5 0 0',
            tooltip: 'Copy',
            iconCls: 'x-fa fa-copy'
        },
        {
            xtype: 'button',
            width: 20,
            itemId: 'btnPricePaste',
            ui: 'header',
            margin: '1 5 0 0',
            tooltip: 'Dán',
            iconCls: 'x-fa fa-paste'
        }
        ]
    }]
});

