Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetInOutView',

    viewModel: {
        type: 'TimeSheetInOutViewModel'
    },
    bind: '{TimeSheetInoutStore}',
    controller: 'TimeSheetInOutViewController',
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: "Mã nhân viên",
            flex: 1,
            dataIndex: 'personel_code',
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
        },
        {
            text: "Tên nhân viên",
            flex: 1,
            dataIndex: 'fullname',
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
        },
        {
            text: "Ngày",
            width: 120,
            dataIndex: 'day'
        },
        {
            text: "Giờ ra/vào",
            flex: 1,
            dataIndex: 'time'
        },
    ],
    dockedItems: [
        {
            layout: 'hbox',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Đơn vị',
                    bind: {
                        store: '{ListOrgStore}',
                        value: '{timesheetinout.orgid_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    margin: 5,
                    labelWidth: 50,
                    itemId: 'orgFactoryList'
                },
                {
                    xtype: 'datefield',
                    labelWidth: 65,
                    fieldLabel: 'Từ ngày',
                    format: 'd/m/Y',
                    margin: 5,
                    itemId: 'onToDate',
                    bind: {
                        value: '{timesheetinout.fromdate}',
                    },
                },
                {
                    xtype: 'timefield',
                    labelWidth: 35,
                    width: 135,
                    fieldLabel: 'Giờ',
                    margin: 5,
                    format: 'H:i',
                    value: '00:00',
                    bind: {
                        value: '{timesheetinout.from_hour}',
                    },
                },
                {
                    xtype: 'datefield',
                    labelWidth: 65,
                    fieldLabel: 'Đến ngày',
                    format: 'd/m/Y',
                    itemId: 'onFromDate',
                    bind: {
                        value: '{timesheetinout.todate}',
                    },
                    margin: 5
                },
                {
                    xtype: 'timefield',
                    labelWidth: 35,
                    width: 135,
                    fieldLabel: 'Giờ',
                    format: 'H:i',
                    value: '00:00',
                    bind: {
                        value: '{timesheetinout.to_hour}',
                    },
                    margin: 5
                },
                {
                    xtype: 'button',
                    text: 'Tìm kiếm',
                    iconCls: 'x-fa fa-filter',
                    itemId: 'btnSearch',
                    margin: 5
                }
            ]
        }
    ]
})