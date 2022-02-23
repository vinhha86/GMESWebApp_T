Ext.define('GSmartApp.view.porders.POrderList.SewingCost.List_WorkingProcess_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'List_WorkingProcess_View',
    id: 'List_WorkingProcess_View',
    requires: [
        'Ext.grid.Panel'
    ],
    border: true,
    controller: 'List_WorkingProcess_ViewController',
    viewModel: {
        type: 'List_WorkingProcess_ViewModel'
    },
    bind: {
        store: '{WorkingProcess_Store}'
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onUpdate'
                },
                {
                    iconCls: 'x-fa fas fa-trash violetIcon',
                    handler: 'onDelete'
                }
            ]
        },
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            // dataIndex: 'sortvalue',
            align: 'center',
            sortable: false
        },
        {
            header: 'Tên công đoạn',
            dataIndex: 'name',
            width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'workingname',
                width: '99%',
                // flex: 1,
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onWorkingnameKeyup',
                    buffer: 500
                }
            }
        },
        {
            header: 'Mã công đoạn',
            dataIndex: 'code',
            width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'workingcode',
                width: '99%',
                // flex: 1,
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onWorkingcodeKeyup',
                    buffer: 500
                }
            }
        }, 
        {
            header: 'Thiết bị',
            // dataIndex: 'devicerequiredid_link',
            dataIndex: 'device_name',
            width: 120,
            // editor: {
            //     xtype: 'combo',
            //     valueField: 'id',
            //     displayField: 'name',
            //     bind: {
            //         store: '{DeviceGroupStore}'
            //     }
            // },
            // renderer: 'renderDevice'
        },
        {
            header: 'Bậc thợ',
            // dataIndex: 'laborrequiredid_link',
            dataIndex: 'laborlevel_name',
            width: 120,
            // editor: {
            //     xtype: 'combo',
            //     valueField: 'id',
            //     displayField: 'name',
            //     bind: {
            //         store: '{LaborStore}'
            //     }
            // },
            // renderer: 'renderLabor'
        },
        {
            header: 'Thời gian',
            dataIndex: 'timespent_standard',
            width: 120,
            renderer: function (value) {
                return value == null ? "" : (value + " (s)");
            }
        },
        {
            header: 'Chú thích',
            dataIndex: 'techcomment',
            flex: 1
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [
            {
                xtype: 'button',
                text: 'Thoát',
                margin: 3,
                itemId: 'btnThoat',
                iconCls: 'x-fa fa-window-close'
            }, {
                xtype: 'button',
                text: 'Chọn',
                margin: 3,
                itemId: 'btnChon',
                iconCls: 'x-fa fa-check'
            }, {
                xtype: 'button',
                text: 'Thêm công đoạn',
                margin: 3,
                itemId: 'btnThemMoi',
                iconCls: 'x-fa fa-plus',
                bind: {
                    disabled: '{isDisable_themmoi}'
                }
            }, {
                xtype: 'button',
                text: 'Xoá',
                margin: 3,
                itemId: 'btnXoa',
                iconCls: 'x-fa fa-trash',
            }, {
                border: false,
                flex: 1
            },
        ]
    }, {
        dock: 'top',
        xtype: 'form',
        layout: 'hbox',
        itemId: 'addWorking',
        hidden: true,
        items: [{
            xtype: 'textfield',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Tên công đoạn',
            width: 150,
            allowBlank: false,
            blankText: 'Trường bắt buộc nhập',
            selectOnFocus: true,
            itemId: 'name',
            bind: {
                value: '{working.name}'
            }
        },
        {
            xtype: 'textfield',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Mã công đoạn',
            width: 150,
            allowBlank: false,
            blankText: 'Trường bắt buộc nhập',
            selectOnFocus: true,
            itemId: 'code',
            bind: {
                value: '{working.code}'
            }
        },
        {
            xtype: 'combo',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Thiết bị',
            itemId: 'device',
            width: 150,
            valueField: 'id',
            displayField: 'name',
            selectOnFocus: true,
            bind: {
                value: '{working.devicerequiredid_link}',
                store: '{DeviceTypeStore}'
            }
        }, {
            xtype: 'combo',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Bậc thợ',
            itemId: 'labor',
            width: 150,
            selectOnFocus: true,
            valueField: 'id',
            displayField: 'name',
            bind: {
                value: '{working.laborrequiredid_link}',
                store: '{LaborStore}'
            }
        }, {
            xtype: 'textfield',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Th.gian',
            maskRe: /[0-9.]/,
            selectOnFocus: true,
            width: 70,
            allowBlank: false,
            itemId: 'time',
            blankText: 'Trường bắt buộc nhập',
            bind: {
                value: '{working.timespent_standard}'
            }
        }, {
            xtype: 'textfield',
            margin: 1,
            fieldLabel: '',
            emptyText: 'Chú thích',
            itemId: 'comment',
            width: 150,
            selectOnFocus: true,
            bind: {
                value: '{working.techcomment}'
            }
        }, {
            flex: 1
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-save',
            margin: 1,
            itemId: 'btnLuu',
            tooltip: 'Lưu',
            formBind: true
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-arrow-circle-up',
            margin: 1,
            tooltip: 'Hủy',
            itemId: 'btnHuy'
        }]
    }]
});
