Ext.define('GSmartApp.view.user.UserGroup', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserGroup',
    id:'UserGroup',
    controller: 'UserGroup_Controller',
    reference: 'UserGroup',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{GroupUserStore}'
    },
    columns:[{
        text: 'Chọn',
        width: 60,
        xtype: 'checkcolumn',
        itemId: 'checkcolumn',
        dataIndex: 'checked',
        align: 'center'
    },{
        text:'Tên nhóm quyền',
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
            value: 'Nhóm quyền'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnThemMoi',
            hidden: true,
			ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm thuộc tính',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

