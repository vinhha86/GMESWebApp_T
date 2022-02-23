Ext.define('GSmartApp.view.dm_loainghiviec.TimeSheetAbsenceTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetAbsenceTypeView',

    viewModel:{
        type:'TimeSheetAbsenceTypeViewModel'
    },
    bind:{
        store: '{TimeSheetAbsenceTypeStore}'
    },
    controller:'TimeSheetAbsenceTypeViewController',
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns: [
        {
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
        }, {
            text: 'Tên loại nghỉ việc',
            dataIndex: 'name',
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
            text: 'Số % lương được hưởng',
            dataIndex: 'percent',
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'PercentFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPercentFilter',
                    buffer: 500
                }
            },
            editor: {

                xtype: 'textfield',
                selectOnFocus: true
            },
        }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            items: [
                {
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
                    allowBlank: true,
                    emptyText: 'Tên loại nghỉ việc',
                    bind: {
                        value: '{absence.name}'
                    }
                }, {
                    xtype: 'textfield',
                    itemId: 'txtName',
                    margin: 5,
                    width: 250,
                    allowBlank: false,
                    emptyText: 'Số % lương được hưởng',
                    bind: {
                        value: '{absence.percent}'
                    }
                }
            ]
        }
    ]
})