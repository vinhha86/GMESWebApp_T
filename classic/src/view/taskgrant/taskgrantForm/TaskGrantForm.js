Ext.define('GSmartApp.view.taskgrant.TaskGrantForm', {
    extend: 'Ext.form.Panel',
    xtype: 'TaskGrantForm',
    id:'TaskGrantForm',
    controller: 'TaskGrantFormController',
    viewModel: {
        type: 'TaskGrantViewModel'
    },
    layout: 'vbox',
    items: [{
        width:'100%',
        // flex: 1,
        margin: 5,
        labelWidth: 130,
        xtype: 'combobox',
        fieldLabel: 'Đơn vị ('+ '<span style="color:red">*</span>' + ')',
        bind:{
            store:'{ListOrgStore}',
            value:'{orgid_link}',
            readOnly: '{isOrgCbBoxReadonly}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        // readOnly: true,
        listeners: {
            change: 'onOrgChange'
        }

    },{
        width:'100%',
        // flex: 1,
        margin: 5,
        labelWidth: 130,
        xtype: 'combobox',
        fieldLabel: 'Loại công việc ('+ '<span style="color:red">*</span>' + ')',
        bind:{
            store:'{TaskType}',
            value:'{tasktypeid_link}',
            readOnly: '{isTasktypeCbBoxReadonly}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        // readOnly: true
    },{
        width:'100%',
        // flex: 1,
        margin: 5,
        labelWidth: 130,
        xtype: 'combobox',
        fieldLabel: 'Người phụ trách ('+ '<span style="color:red">*</span>' + ')',
        bind:{
            store:'{UserListStore}',
            value:'{userid_link}'
        },
        displayField: 'fullName',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        // readOnly: true
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})