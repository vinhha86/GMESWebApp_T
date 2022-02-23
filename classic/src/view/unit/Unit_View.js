Ext.define('GSmartApp.view.unit.Unit_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Unit_View',
    id: 'Unit_View',
    viewModel: {
        type: 'UnitViewModel'
    },
    controller: 'UnitViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'Unit_View',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{UnitStore}'
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
            reference: 'unitCodeFilter',
            width: 96,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnitCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên đơn vị',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'unitNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnitNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên đơn vị tiếng Anh',
        dataIndex: 'name_en',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'unitEnNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUnitEnNameFilterKeyup',
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

