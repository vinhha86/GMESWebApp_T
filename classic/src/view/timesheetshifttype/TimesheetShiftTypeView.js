Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimesheetShiftTypeView',
    id: 'TimesheetShiftTypeView',
    viewModel: {
        type: 'TimesheetShiftTypeViewModel'
    },
    controller: 'TimesheetShiftTypeViewController',
    reference: 'TimesheetShiftTypeView',
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{TimesheetShiftTypeStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 60,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip:"Xóa",
            handler: 'onXoa'
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên ca làm việc',
        dataIndex: 'name',
        sortable: false,
        menuDisabled: true,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'NameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNameFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,

        },
    }, {
        text: 'Mã ca làm việc',
        dataIndex: 'code',
        sortable: false,
        menuDisabled: true,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'CodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onCodeFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,

        },
    }, {
        xtype: 'checkcolumn',
        dataIndex: 'is_ca_an',
        width: 50,
        headerCheckbox: false,
        sortable: false,
        menuDisabled: true,
        text: 'Ca ăn',
        listeners: {
            checkchange: 'onCheckcolumnCheckChange',
        }
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 110,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThemMoi'
            },
            {
                xtype: 'textfield',
                itemId: 'txtCode',
                margin: 5,
                width: 250,
                allowBlank: true,
                emptyText: 'Tên ca làm việc',
                bind: {
                    value: '{shift.name}'
                }
            }, {
                xtype: 'textfield',
                itemId: 'txtName',
                margin: 5,
                width: 250,
                allowBlank: false,
                emptyText: 'Mã ca làm việc',
                bind: {
                    value: '{shift.code}'
                }
            },
            {
                xtype: 'checkbox',
                itemId: 'txtIsCaAn',
                margin: 5,
                // width: 50,
                labelWidth: 60,
                // allowBlank: false,
                emptyText: 'Ca ăn',
                fieldLabel: 'Ca ăn',
                bind: {
                    value: '{shift.is_ca_an}'
                }
            }
        ]
    }]
});

