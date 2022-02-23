Ext.define('GSmartApp.view.Port.PortView', {
    extend: 'Ext.grid.Panel',
    xtype: 'portView', // same with database, 'PortView' shows error
    id: 'PortView',
    viewModel: {
        type: 'PortViewModel'
    },
    controller: 'PortViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'PortView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PortStore}'
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
        width: 150,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'portCodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPortCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên cảng',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'portNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPortNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên cảng tiếng Anh',
        dataIndex: 'name_en',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'portEnNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPortEnNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Phương thức vận chuyển',
        dataIndex: 'shipModeName',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'portShipModeNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPortShipModeNameFilterKeyup',
                buffer: 500
            }
        }
    }, ],
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

