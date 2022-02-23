
Ext.define('GSmartApp.view.dm_tracuu.DictionaryView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DictionaryView',


    viewModel:{
        type:'DictionaryViewModel'
    },
    controller:'DictionaryViewController',
    
    bind:{
        store:'{Dictionary_Store}'
    },

    plugins: {
        cellediting: {
            clicksToEdit: 1,
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
                selectOnFocus: true,
                xtype:'combobox',
                margin:5,
               // width: 250,
                valueField:'id',
                displayField:'name',
                bind:{
                    store:'{DictionaryType_Store}',
                    value:'{dictionary.type}'
                }
                },
           
        }, {
            text:'Tên câu hỏi',
            flex:1,
            dataIndex:'question',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'questionFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onquestionFilter',
                    buffer: 500
                }
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
              
                },
           
        }, {
            text:'Tên câu trả lời',
            flex:1,
            dataIndex:'answer',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'answerFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onanswerFilter',
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
                    fieldLabel:'Loại từ điển',
                    xtype:'combobox',
                    margin:5,
                   // width: 250,
                    valueField:'id',
                    displayField:'name',
                    bind:{
                        store:'{DictionaryType_Store}',
                        value:'{dictionary.dictionary_typeid_link}'
                    }

                },
                {
                    xtype:'textfield',
                    emptyText:'Tên câu hỏi',
                    margin:5,
                    width: 250,
                    bind:{
                        value:'{dictionary.question}'
                    }

                },
                {
                    xtype:'textfield',
                    emptyText:'Tên câu trả lời',
                    margin:5,
                    width: 250,
                    bind:{
                        value:'{dictionary.answer}'
                    }

                }
            ]
        }
    ]
})
