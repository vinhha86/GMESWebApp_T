Ext.define('GSmartApp.view.groupuser.GroupUser_Function', {
    extend: 'Ext.grid.Panel',
    xtype: 'GroupUser_Function',
    id:'GroupUser_Function',
    controller: 'GroupUser_Function_Controller',
    reference: 'GroupUser_Function',
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
        text: 'Chọn',
        width: 60,
        xtype: 'checkcolumn',
        itemId: 'checkcolumn',
        dataIndex: 'checked',
        align: 'center'
    },{
        text:'Tên chức năng',
        dataIndex:'name',
        flex: 1
    },{
        text: 'Chỉ xem',
        width: 70,
        xtype: 'checkcolumn',
        itemId: 'checkcolumn_readonly',
        dataIndex: 'readonly',
        align: 'center'
    }]
});

