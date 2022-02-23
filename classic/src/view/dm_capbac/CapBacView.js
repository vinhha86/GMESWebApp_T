Ext.define('GSmartApp.view.dm_capbac.CapBacView',{
    extend:'Ext.grid.Panel',
    xtype: 'CapBacView',

    controller:'CapBacViewController',
    viewModel:'CapBacViewModel',
    bind:{
        store:'{LaborlevelStore}'
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
        },{
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        }, {
            text: 'Tên cấp bậc',
            dataIndex: 'name',
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'Personnel_Level_NameFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPersonnel_Level_NameFilter',
                    buffer: 500
                }
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
              
                },
        },
        {
            text: 'Mã cấp bạc ',
            dataIndex: 'code',
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'Personnel_Level_CodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPersonnel_Level_CodeFilter',
                    buffer: 500
                }
            },
            editor: {
               
                xtype: 'textfield',
                selectOnFocus: true
                },
        },{
            text: 'Chú thích',
            dataIndex: 'comment',
            flex: 1,
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
              
                },
        },{
            text: 'Tỉ lệ',
            dataIndex: 'rate',
            width:70,
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
            items: [{
                xtype: 'button',
                margin: 5,
                text: 'Thêm mới',
                width: 120,
                iconCls:'x-fa fa-plus',
                itemId: 'btnThemMoi'
            },
            {
                xtype:'textfield',
                margin: 5,
                width: 200,
                emptyText: 'Tên cấp bậc',
                bind:{
                    value:'{laborlevel.name}'
                }
            },
            {
                xtype:'textfield',
                margin: 5,
                width: 200,
                emptyText: 'Mã cấp bậc',
                bind:{
                    value:'{laborlevel.code}'
                }
            },
            {
                xtype:'textfield',
                margin: 5,
                width: 200,
                emptyText: 'Chú thích',
                bind:{
                    value:'{laborlevel.comment}'
                }
            },
            {
                xtype:'textfield',
                margin: 5,
                width: 200,
                emptyText: 'Tỉ lệ',
                bind:{
                    value:'{laborlevel.rate}'
                }
            },
            ]
        }
    ]
})