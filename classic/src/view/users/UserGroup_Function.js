Ext.define('GSmartApp.view.groupuser.UserGroup_Function', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserGroup_Function',
    id:'UserGroup_Function',
    reference: 'UserGroup_Function',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{FunctionStore}'
    },
    columns:[{
        text:'Tên chức năng',
        dataIndex:'name',
        flex: 1
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        border: true,
        height: 45,
        style:"background-color : white",
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            value: 'Quyền chức năng'
        }]
    }]
});

