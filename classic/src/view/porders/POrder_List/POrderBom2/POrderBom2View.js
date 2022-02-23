Ext.define('GSmartApp.view.porders.POrder_List.POrderBom2.POrderBom2View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderBom2View',
    id: 'POrderBom2View',
    controller: 'POrderBom2ViewController',
    bind: {
        store: '{POrderBom2Store}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    viewConfig: {
        stripeRows: false,
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
    columns: [{
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
        text: 'Màu SP',
        dataIndex: 'color_name',
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterField',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueKeyup',
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
        }
    }, {
        text: 'TP vải',
        dataIndex: 'thanhPhanVai',
        width: 200,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
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
        }
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                text: 'Đồng bộ định mức cân đối',
                margin: 3,
                itemId: 'btnDongBo',
                iconCls: 'x-fa fa-refresh',
            },
            {
                xtype: 'button',
                text: 'Chốt định mức',
                itemId: 'btnConfirmBOM_POrder',
                // ui: 'header',
                tooltip: 'Chốt định mức sản xuất',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }
        ]
    }]
})