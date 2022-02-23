Ext.define('GSmartApp.view.dm_shop.DanhSachShopView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DanhSachShopView',
    id: 'DanhSachShopView',
    viewModel: {
        type: 'DanhSachShopViewModel'
    },
     controller: 'DanhSachShopViewController',
  
    bind: {
        store: '{OrgStore}'
    },

    columns: [{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: 'Cập nhật',
            handler: 'onCapNhat'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'shopCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onShopCodeFilter',
                buffer: 500
            }
        }
    }, {
        text: 'Tên nhà cửa hàng',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'shopNameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onShopNameFilter',
                buffer: 500
            }
        }
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 90,
        align: 'end'
    },{
        text: 'Email',
        dataIndex: 'email',
        width: 150
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
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
        }]
    }]
});