Ext.define('GSmartApp.view.sync.SyncJob.SyncJobView', {
    extend: 'Ext.grid.Panel',
    xtype: 'SyncJobView',
    id: 'SyncJobView',
    controller: 'SyncJobViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 0) {
                return "po_wrongamount";
            }
        }
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{SyncJobStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu'
            }
        ]
    }, {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên',
        dataIndex: 'jobname',
        width: 150,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Trạng thái',
        dataIndex: 'staus_name',
        width: 120
    },
    {
        text: 'Class',
        dataIndex: 'class_namespace',
        width: 220,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Time format',
        dataIndex: 'time_format',
        width: 100,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Thư mục nguồn',
        dataIndex: 'src',
        width: 200,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Thư mục đích',
        dataIndex: 'des',
        width: 200,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Người lập',
        dataIndex: 'user_created_name',
        width: 120
    },
    {
        text: 'Ngày lập',
        dataIndex: 'date_created',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y H:i:s')
    },
    {
        text: 'Field1',
        dataIndex: 'field1',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Field2',
        dataIndex: 'field2',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Field3',
        dataIndex: 'field3',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Field4',
        dataIndex: 'field4',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Field5',
        dataIndex: 'field5',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    },
    {
        text: 'Field6',
        dataIndex: 'field6',
        width: 70,
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        }
    }
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                tooltip: 'Tải lại',
                iconCls: 'x-fa fa-sync',
                margin: 3,
                itemId: 'btnReload'
            }, {
                xtype: 'button',
                margin: 3,
                text: 'Thêm mới lịch',
                itemId: 'btnThemMoi'
            }]
        }
    ]
});

