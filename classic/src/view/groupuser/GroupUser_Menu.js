Ext.define('GSmartApp.view.groupuser.GroupUser_Menu', {
    extend: 'Ext.tree.Panel',
    xtype: 'GroupUser_Menu',
    id:'GroupUser_Menu',
    controller: 'GroupUser_Menu_Controller',
    reference: 'GroupUser_Menu',
    // viewConfig: {
    //     stripeRows: true,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true
    // },    
    rootVisible: false,
    bind:{
        store:'{MenuStore}'
    },
    columns:[{
        text:'Menu chức năng',
        dataIndex:'text',
        xtype: 'treecolumn',
        flex: 1
    }]
});

