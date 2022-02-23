Ext.define('GSmartApp.view.groupuser.GroupUserMain', {
    extend: 'Ext.form.Panel',
    xtype: 'GroupUserMain',
    id:'GroupUserMain',
    viewModel:{
        type:'GroupUser_ViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'west',
        width: '30%',
        title: 'Danh sách nhóm',
        xtype: 'GroupUser_List',
        border: true,
        margin: 1
    }, {
        region: 'center',
        border : true,
        title: 'Menu chức năng',
        xtype: 'GroupUser_Menu',
        margin: 1
    }, {
        region: 'east',
        width: '30%',
        //collapsible: true,
        title: 'Quyền chức năng',
        xtype: 'GroupUser_Function',
        border: true,
        margin: 1
    }]
})