Ext.define('GSmartApp.view.provider.ProviderView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProviderView',
    id: 'ProviderView',
    viewModel: {
        type: 'ProviderViewModel'
    },
    controller: 'ProviderViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'ProviderView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
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
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'providerCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onProviderCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên nhà cung cấp',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'providerNameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onProviderNameFilterKeyup',
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

