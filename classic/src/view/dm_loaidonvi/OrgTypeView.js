Ext.define('GSmartApp.view.dm_loaidonvi.OrgTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'OrgTypeView',


    controller: 'OrgTypeViewController',
    viewModel: {
        type: 'OrgTypeViewModel'
    },
    bind: {
        store: '{orgtype_store}'
    },


    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Mã loại đơn vị',
        width: 100,
        dataIndex: 'id',
        align: 'center'
    },
    {
        text: 'Tên loại đơn vị',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'OrgTypeNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onOrgTypeNameFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,

        },
    }, {
        text: 'Tên loại đơn vị (Tiếng Anh)',
        dataIndex: 'name_en',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'OrgTypeName_enFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onOrgTypeName_enFilter',
                buffer: 500
            }
        },
        editor: {

            xtype: 'textfield',
            selectOnFocus: true
        },
    }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 120,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }, {
            xtype: 'textfield',
            itemId: 'txtCode',
            margin: 5,
            width: 250,
            emptyText: 'Tên loại đơn vị',
            bind: {
                value: '{org.name}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'txtName',
            margin: 5,
            width: 250,
            emptyText: 'Tên loại đơn vị (Tiếng Anh)',
            bind: {
                value: '{org.name_en}'
            }
        }
        ]
    }],
})