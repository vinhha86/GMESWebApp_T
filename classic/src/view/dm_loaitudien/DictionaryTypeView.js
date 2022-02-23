
Ext.define('GSmartApp.view.dm_loaitudien.DictionaryTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DictionaryTypeView',


    viewModel:{
        type:'DictionaryTypeViewModel'
    },
    controller:'DictionaryTypeViewController',
    
    bind:{
        store:'{DictionaryType_Store}'
    },

    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns:[
        {
            xtype:'actioncolumn',
            width:30,
            items:[
                {
                    iconCls:'x-fa fa-trash',
                    tooltip:'Xóa',
                    handler:'onXoa'
                }
            ]
           
        },
        {
            text:'STT',
            width:50,
            xtype:'rownumberer',
            align:'center',
            
        },
        {
            text:'Tên loại từ điển',
            flex:1,
            dataIndex:'name',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'dictionary_typeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'ondictionary_typeFilter',
                    buffer: 500
                }
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
              
                },
           
        }
    ],
    dockedItems:[
        {
            dock:'bottom',
            layout:'hbox',
            items:[
                {
                    xtype:'button',
                    text:'Thêm mới',
                    iconCls:'x-fa fa-plus',
                    margin:5,
                    itemId:'onThemMoi'
                },
                {
                    xtype:'textfield',
                    emptyText:'Tên loại từ điển',
                    margin:5,
                    width: 250,
                    bind:{
                        value:'{dictionary.name}'
                    }

                }
            ]
        }
    ]
})
