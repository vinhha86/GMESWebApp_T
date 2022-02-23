Ext.define('GSmartApp.view.sync.Folder.CreatedJobView', {
    extend: 'Ext.form.Panel',
    xtype: 'CreatedJobView',
    id: 'CreatedJobView',
    layout: 'vbox',
    controller: 'CreatedJobViewController',
    viewModel: {
        type: 'CreatedJobViewModel'
    },
    items: [{
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Tên job',
        bind: {
            value: '{jobname}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thư mục nguồn',
        bind: {
            value: '{src_path}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thư mục đích',
        bind: {
            value: '{des_path}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Class',
        bind: {
            value: '{classname}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thời gian',
        bind: {
            value: '{time_format}'
        }
    }, {
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field1',
            bind: {
                value: '{field1}'
            }
        }, {
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field2',
            bind: {
                value: '{field2}'
            }
        }]
    }, {
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field3',
            bind: {
                value: '{field3}'
            }
        }, {
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field4',
            bind: {
                value: '{field4}'
            }
        }]
    }, {
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field5',
            bind: {
                value: '{field5}'
            }
        }, {
            xtype: 'textfield',
            margin: 5,
            flex: 1,
            fieldLabel: 'Field6',
            bind: {
                value: '{field6}'
            }
        }]
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        }, {
            xtype: 'button',
            text: 'Xác nhận',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-check'
        }, {
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})