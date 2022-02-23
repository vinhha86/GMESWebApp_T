Ext.define('GSmartApp.view.systemmenu.SystemMenuAddView', {
    extend: 'Ext.form.Panel',
    xtype: 'SystemMenuAddView',
    id:'SystemMenuAddView',
    controller:'SystemMenuAddViewController',
    viewModel:{
        type:'SystemMenuAddViewModel'
    },
    items:[
        {
            xtype:'textfield',
            fieldLabel:'Menu cha:',
            margin: 5,
            bind:'{Menu.text}',
            readOnly:true
        },
        {
            xtype:'textfield',
            fieldLabel:'Menu mới:',
            margin: 5,
            bind:'{Menu.text_vi}'
        },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel:'ID:',
            bind:'{Menu.id}'
        },{
            xtype:'textfield',
            margin: 5,
            fieldLabel:'Xtype:',
            bind:'{Menu.xtype}'
        },{
            xtype:'textfield',
            margin: 5,
            fieldLabel:'Icon:',
            bind:'{Menu.icon}'
        },
    ],
    dockedItems:[
        {
            dock: 'bottom',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                align: 'center',
                iconCls: 'x-fa fa-save',
                margin: 5,
                itemId: 'onThemMoi',
                formBind: true,
                text:'Lưu'
            },
            {
                xtype: 'button',
                align: 'center',
                iconCls: 'x-fa fa-sign-out',
                margin: 5,
                itemId: 'exit',
                text:'Thoát'
            }
            ]
        }
    ]
})