Ext.define('GSmartApp.view.users.UserGroup_Menu', {
    extend: 'Ext.tree.Panel',
    xtype: 'UserGroup_Menu',
    id:'UserGroup_Menu',
    reference: 'UserGroup_Menu',
    controller: 'UserGroup_Menu_Controller',
    rootVisible: false,
    bind:{
        store:'{MenuStore}'
    },
    columns:[{
        text:'Menu chức năng',
        dataIndex:'text',
        xtype: 'treecolumn',
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
            value: 'Menu chức năng'
        }]
    }]
});

