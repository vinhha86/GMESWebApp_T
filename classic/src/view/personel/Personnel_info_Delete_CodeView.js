Ext.define('GSmartApp.view.personel.Personnel_info_Delete_CodeView', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_info_Delete_CodeView',
    id: 'Personnel_info_Delete_codeView',

    controller:'Personnel_info_Delete_CodeViewController',
    items:[{
        itemId:'masp',
        xtype: 'textfield',
        fieldLabel: "Mã nhân viên ",
        flex: 1,
        align: 'center',
        margin: 5,
        allowBlank: false,
        blankText: 'Không được trống',
        bind: '{personnel.code_del}',
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            align: 'center',
            iconCls: 'x-fa fa-save',
            margin: 5,
            text:'Chọn',
            itemId: 'add',
            formBind: true
        },
        {
            xtype: 'button',
            align: 'center',
            iconCls: 'x-fa fa-sign-out',
            margin: 5,
            text:'Thoát',
            itemId: 'exit'
        }
        ]
    }]
})