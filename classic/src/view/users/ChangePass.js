Ext.define('GSmartApp.view.users.ChangePass', {
    extend: 'Ext.form.Panel',
	xtype:'ChangePass',
    id: 'ChangePass',
    controller: 'ChangePass_Controller',
    viewModel: {
        type: 'ChangePass_ViewModel'
    },
	layout: 'vbox',
	items:[
        {
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Tài khoản',
            readOnly: true,
            bind: {
                value: '{username}'
            }
        },
        {
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Mật khẩu cũ',
            inputType: 'password',
            bind: {
                value: '{old_pass}'
            },
            allowBlank: false,
            blankText: 'Bạn phải nhập mật khẩu cũ'
        },
        {
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Mật khẩu mới',
            inputType: 'password',
            bind: {
                value: '{new_pass}'
            },
            allowBlank: false,
            blankText: 'Bạn phải nhập mật khẩu mới'
        }
    ],
	dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]	 
});

