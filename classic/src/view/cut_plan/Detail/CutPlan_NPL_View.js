Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_NPL_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutPlan_NPL_View',
    itemId: 'CutPlan_NPL_View',
    controller: 'CutPlan_NPL_ViewCotroller',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ProductStore}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    columns: [{
        text: 'STT',
        width: 45,
        sortable: false,
        menuDisabled: true,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NPL',
        dataIndex: 'product_code',
        width: 120,
        sortable: false,
        menuDisabled: true,
        locked: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
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
    },
    // {
    //     text: 'Tên NPL',
    //     dataIndex: 'product_name',
    //     width: 120,
    //     locked: true,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },
    {
        text: 'Màu NPL',
        dataIndex: 'mauSanPham',
        width: 150,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coSanPham',
        width: 60,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        width: 120,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 38,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth: 0,
            value: 'Danh sách NPL'
        }
        ]
    }]
});

