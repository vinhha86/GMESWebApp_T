Ext.define('GSmartApp.view.pcontract.PContractSelectProductView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractSelectProductView',
    id: 'PContractSelectProductView',
    viewModel: {
        type: 'PContractSelectProductViewModel'
    },
    IdPcontract: 0,
    controller: 'PContractSelectProductViewCotroller',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    reference: 'PContractSelectProductView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ProductStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã SP',
        dataIndex: 'code',
        width: 70
    }, {
        text: 'Tên sản phẩm',
        dataIndex: 'name',
        width: 150
    }, {
        text: 'Người thiết kế',
        dataIndex: 'designerName',
        flex: 1
    }, {
        text: 'Người may mẫu',
        dataIndex: 'samplemakername',
        flex: 1
    },{
        text: 'Ảnh',
        dataIndex: 'urlimage',
        width: 50,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:25px; height:25px" src="data:image/gif;base64,'+ value +'">';
        }
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype:'textfield',
            labelWidth: 0,
            emptyText: "Tên sản phẩm",
            itemId: 'name',
            margin: '5 0 5 5'
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 1',
            emptyText: "Mã sản phẩm",
            itemId: 'code'
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-filter',
            itemId: 'btnTimKiem'
        },{
            xtype: 'button',
            text: 'Chọn',
            margin: '5 1 5 1',
            itemId: 'btnChon',
            iconCls: 'x-fa fa-check'
        },{
            flex: 1,
            border: false
        },{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 110,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
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
            itemId: 'page',
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

