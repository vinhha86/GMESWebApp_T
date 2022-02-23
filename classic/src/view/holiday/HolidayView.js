Ext.define('GSmartApp.view.holiday.HolidayView', {
    extend: 'Ext.grid.Panel',
    xtype: 'HolidayView',
    id: 'HolidayView',
    viewModel: {
        type: 'HolidayViewModel'
    },
    controller: 'HolidayViewController',
    reference: 'HolidayView',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{HolidayStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
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
        text: 'Nghỉ từ',
        dataIndex: 'day',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        flex: 1,
        editor:{
            completeOnEnter: true,
            field: {
                xtype: 'datefield',
                format: 'd/m/Y',
                pickerAlign: 'tr-br?',
                listeners: {
                    focusenter: 'onDateFocus',
                    change: 'onDateChange',
                    focusleave: 'onFocusLeave'
                }
            }
        }
    }, {
        text: 'Nghỉ đến',
        dataIndex: 'dayto',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        flex: 1,
        editor:{
            completeOnEnter: true,
            field: {
                xtype: 'datefield',
                format: 'd/m/Y',
                pickerAlign: 'tr-br?',
                listeners: {
                    focusenter: 'onDateToFocus',
                    change: 'onDateToChange',
                    focusleave: 'onFocusLeave'
                }
            }
        }
    }, {
        text: 'Nội dung',
        dataIndex: 'comment',
        flex: 1,
        editor:{
            field: {
                xtype: 'textfield',
                listeners:{
                    change: 'onCommentChange',
                    focusleave: 'onFocusLeave'
                }
            }
        }
    }, {
        xtype: 'actioncolumn',
        width: 40,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [
            {
                width:200,
                margin: 5,
                labelWidth: 105,
                xtype: 'combobox',
                reference: 'yearsCboBox',
                fieldLabel: 'Chọn theo năm',
                bind:{
                    store:'{HolidayYearStore}'
                },
                displayField: 'year',
                valueField: 'year',
                value: new Date().getFullYear(),
                queryMode: 'local',
				anyMatch: true,
                editable: false,
                allowBlank: false,
                listeners: {
                    change: 'onChange'
                }
            },
            {
                flex: 1,
                border: false
            }
        ]
    },{
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
                xtype: 'button',
                margin: 5,
                text: 'Tạo ngày nghỉ mặc định',
                width: 200,
                iconCls: 'x-fa fa-plus',
                itemId: 'btnClone'
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Xoá',
                width: 110,
                iconCls: 'x-fa fa-trash',
                itemId: 'btnXoa'
            },
            {
                flex: 1,
                border: false
            },

            //////////////////////////////////////
            
            // {
            //     xtype: 'button',
            //     margin: 5,
            //     text: 'POP UP WINDOW',
            //     width: 110,
            //     iconCls: 'x-fa fa-plus',
            //     itemId: 'btnPopupWindow',
            //     handler: 'onPopupWindowClicked'
            // }

            //////////////////////////////////////
        ]
    }]
});

