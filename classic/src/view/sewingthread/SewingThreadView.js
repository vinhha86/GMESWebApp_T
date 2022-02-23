Ext.define('GSmartApp.view.sewingtrim.SewingThreadView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SewingThreadView',
    id: 'SewingThreadView',
    viewModel: {
        type: 'SewingThreadViewModel'
    },
    controller: 'SewingThreadViewCotroller',
    reference: 'SewingThreadView',
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
        text: 'Mã chỉ may',
        dataIndex: 'buyercode',
        width: 150
    },{
        text: 'Tên chỉ may',
        dataIndex: 'name',
        cls: 'x-grid3-hd-inner',
        flex: 1,
    },{
        text: 'Màu',
        dataIndex: 'tenMauNPL',
        width: 150
    },{
        text: 'Cỡ',
        dataIndex: 'coKho',
        width: 150
    },
    // {
    //     text: 'Thành phần vải',
    //     dataIndex: 'thanhPhanVai',
    //     flex: 1
    // },  
    ],
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
            emptyText: "Tên chỉ may",
            itemId: 'name',
            margin: '5 0 5 5'
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 1',
            emptyText: "Mã chỉ may",
            itemId: 'code'
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        },{
            flex: 1,
            border: false
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

