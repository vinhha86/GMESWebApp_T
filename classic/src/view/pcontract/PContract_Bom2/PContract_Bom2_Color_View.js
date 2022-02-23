Ext.define('GSmartApp.view.pcontract.PContract_Bom2_Color_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom2_Color_View',
    controller: 'PContract_Bom2_Color_ViewCotroller',
    colorid_link: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        collapseTip: "",
        expandTip: ""
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{PContractBom2ColorStore}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            itemId: 'btnDeleteMaterial_Bom2',
            isActionDisabled: 'checkActionColumnPermission',
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldMaNPL',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueMaNPLKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldNPL',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueNPLKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 80
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 80
    }, {
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 70,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'combo',
                    bind: {
                        store: '{UnitStore}'
                    },
                    valueField: 'id',
                    displayField: 'code',
                    queryMode: 'local'
                }
            })
        },
        renderer: 'renderUnit'
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            return Ext.util.Format.number(value, '0.00') + " %";
        }
    }, {
        text: 'Chung',
        dataIndex: 'amount',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    }, {
        text: 'Màu',
        dataIndex: 'amount_color',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if (value == 0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    }]
});

