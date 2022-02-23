Ext.define('GSmartApp.view.Customer.CustomerView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CustomerView',
    id: 'CustomerView',
    viewModel: {
        type: 'CustomerViewModel'
    },
    controller: 'CustomerViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    reference: 'CustomerView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{OrgStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100
    }, {
        text: 'Tên khách hàng',
        dataIndex: 'name',
        width: 150,
        flex: 1
    }, {
        text: 'Điện thoại',
        dataIndex: 'phone',
        width: 90
    },{
        text: 'Email',
        dataIndex: 'email',
        width: 150
    }, {
        text: 'Địa chỉ',
        dataIndex: 'address',
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onCapNhat'
        }, {
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
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

