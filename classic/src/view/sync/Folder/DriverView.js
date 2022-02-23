Ext.define('GSmartApp.view.sync.Folder.DriverView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DriverView',
    id: 'DriverView',
    controller: 'DriverViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    allowDeselect: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    bind: {
        store: '{FolderDriverStore}'
    },
    columns: [{
        width: 35,
        xtype: 'templatecolumn',
        dataIndex: 'IsDir',
        tpl: '<tpl if="IsDir"><i class="fa fa-folder" style="color: #3074bb"></i></tpl>'
    }, {
        text: 'Tên',
        dataIndex: 'Name',
        flex: 1
    },
    {
        text: 'Kích thước',
        dataIndex: 'Size',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            value = Math.round((value / 1024) * 100) / 100;
            return value == 0 ? "" : value + " KB";
        }
    },
    {
        text: 'Ngày cập nhật',
        dataIndex: 'ModTime',
        width: 120,
        renderer: Ext.util.Format.dateRenderer('d/m/y H:i:s')
    },
    {
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            handler: 'onXoa',
            getClass: function (v, meta, rec) {
                if (rec.get('IsDir') == false) {
                    return 'x-fa fas fa-trash';
                }
            },
            getTip: function (value, metadata, record, row, col, store) {
                if (record.get('IsDir') == false) {
                    return 'Xóa';
                }
            }
        }]
    }
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    tooltip: 'Tải lại',
                    iconCls: 'x-fa fa-sync',
                    margin: 3,
                    itemId: 'btnReload'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: "Tên thư mục",
                    margin: 3,
                    flex: 1,
                    editable: false,
                    bind: {
                        value: '{pathDriver}'
                    }
                },
                {
                    xtype: 'textfield',
                    margin: 3,
                    width: 120,
                    emptyText: 'Thư mục mới',
                    allowBlank: false,
                    bind: {
                        value: '{newFolder}',
                        hidden: '{isAddFolder}'
                    }
                },
                {
                    xtype: 'button',
                    tooltip: 'Lưu',
                    iconCls: 'x-fa fa-save',
                    margin: 3,
                    itemId: 'btnSaveFolder',
                    formBind: true,
                    bind: {
                        hidden: '{isAddFolder}'
                    }
                },
                {
                    xtype: 'button',
                    tooltip: 'Thêm thư mục',
                    iconCls: 'x-fa fa-plus',
                    margin: 3,
                    itemId: 'btnAddFolder'
                }
            ]
        }
    ]
});

