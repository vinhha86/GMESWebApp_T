Ext.define('GSmartApp.view.dm_loainhanvien.PersonnelTypeView',{
    extend:'Ext.grid.Panel',
    xtype:'PersonnelTypeView',

    viewModel:{
        type:'PersonnelTypeViewModel'
    },
    controller:'PersonnelTypeViewController',
    bind:{
        store:'{Personnel_Type}'
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
            align:'center',
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
            align:'center'

        },
        {
            text:'Tên loại nhân viên',
            flex:1,
            dataIndex:'name',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'personnel_typeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onpersonnel_typeFilter',
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
                    margin:5,
                    iconCls:'x-fa fa-plus',
                    text:'Thêm mới',
                    itemId:'btnThemMoi'
                },{
                    xtype:'textfield',
                    emptyText:'Tên loại nhân viên',
                    margin:5,
                    width: 250,
                    bind:{
                        value:'{personnel_type.name}'
                    }
                }
            ]
        }
    ]
})