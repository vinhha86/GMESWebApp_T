Ext.define('GSmartApp.view.material.MaterialView', {
    extend: 'Ext.grid.Panel',
    xtype: 'MaterialView',
    id: 'MaterialView',
    viewModel: {
        type: 'MaterialViewModel'
    },
    controller: 'MaterialViewCotroller',
    reference: 'MaterialView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ProductStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã Nguyên liệu',
        dataIndex: 'buyercode',
        width: 150
    }, {
        text: 'Tên Nguyên liệu',
        dataIndex: 'name',
        cls: 'x-grid3-hd-inner',
        width: 250
    },{
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 150,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 150
    },{
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1
    },],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: 5,
            emptyText: "Mã nguyên liệu",
            itemId: 'code'
        },{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Tên nguyên liệu",
            itemId: 'name',
            margin: 5,
        },{
            xtype: 'button',
            margin: 5,
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'textfield',
            value: 25,
            itemId: 'limitpage',
            maskRe: /[0-9]/,
            width: 180,
            selectOnFocus: true,
            margin: 5,
            fieldLabel: 'Số bản ghi/ Trang',
            labelWidth: 120
        }, '-', {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            flex: 1,
            nextText: 'Trang tiếp',
            prevText: 'Trang trước',
            afterPageText: '/ {0}',
            beforePageText: 'Trang',
            itemId: 'trang',
            refreshText: 'Làm mới dữ liệu',
            border: false,
            bind: {
                store: '{ProductStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

