Ext.define('GSmartApp.view.dm_chucvu.PersonnelPositionView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PersonnelPositionView',

    
    controller:'PersonnelPositionViewController',
    viewModel:{
        type:  'PersonnelPosition_ViewModel'
      },
    bind:{
        store: '{personnel_position_store}'
    },
    
    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, 
    {
        text: 'Tên chức vụ',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'Personnel_Position_NameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnel_Position_NameFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
          
            },
    }, {
        text: 'Tên chức vụ (Tiếng Anh)',
        dataIndex: 'name_en',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'Personnel_Position_NameEnFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnel_Position_NameEnFilter',
                buffer: 500
            }
        },
        editor: {
           
            xtype: 'textfield',
            selectOnFocus: true
            },
    }, {
        text: 'Mã chức vụ ',
        dataIndex: 'code',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'Personnel_Position_CodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnel_Position_CodeFilter',
                buffer: 500
            }
        },
        editor: {
           
            xtype: 'textfield',
            selectOnFocus: true
            },
    }
],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 120,
            iconCls:'x-fa fa-plus',
            itemId: 'btnThemMoi'
        },{
            xtype:'textfield',
            margin: 5,
            width: 250,
            emptyText: 'Tên chức vụ',
            bind:{
                value:'{personnelPos.name}'
            }
        },{
            xtype:'textfield',
            margin: 5,
            width: 250,
            emptyText: 'Tên chức vụ (Tiếng Anh)',
            bind:{
                value:'{personnelPos.name_en}'
            }
        },{
            xtype:'textfield',
            margin: 5,
            width: 250,
            emptyText: 'Mã chức vụ',
            bind:{
                value:'{personnelPos.code}'
            }
        }
    ]
    }],
})