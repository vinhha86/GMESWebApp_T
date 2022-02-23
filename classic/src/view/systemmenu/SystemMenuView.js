Ext.define('GSmartApp.view.systemmenu.SystemMenuView', {
    extend: 'Ext.tree.Panel',
    xtype: 'SystemMenuView',
    id: 'SystemMenuView',
    controller: 'SystemMenuViewController',
    reference: 'SystemMenuView',
    viewModel: {
        type: 'SystemMenuViewModel'
    },
    rootVisible: false,
    bind: {
        store: '{MenuStore}'
    },
    columns: [{
        text: 'Menu chức năng',
        dataIndex: 'text',
        xtype: 'treecolumn',

        flex: 1
    },{
        text:'Id',
        dataIndex:'id',
        flex: 1
    },{
        text:'Xtype',
        dataIndex:'viewType',
        flex: 1
    },{
        text:'Icon',
        dataIndex:'iconCls',
        flex: 1
    }
],
    dockedItems:[
        {
            dock:'bottom',
            items:[
                {
                    xtype:'button',
                    text:'Thêm mới',
                    iconCls:'x-fa fa-plus',
                    itemId:'onThemMoi',
                    margin:5
                }
            ]
        }
    ]
});

