Ext.define('GSmartApp.view.login.RegisterDemo', {
    extend: 'Ext.form.Panel',
    xtype: 'RegisterDemo',
    id: 'RegisterDemo',
    controller: 'RegisterDemo_Controller',
    viewModel: {
        type: 'RegisterDemo_ViewModel'
    },    
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            padding: 2,
            layout: 'hbox',
            width: '100%',
            height: '25%',
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Tên (<span style = 'color: red'>*</span>)",
                    labelAlign: 'top',
                    name: 'reguser',
                    allowBlank: false,
                    flex: 1,
                    bind: {
                        value: '{reguser}'
                    }   
                },
                {
                    xtype: 'textfield',
                    margin: 2,
                    labelAlign: 'top',
                    name: 'regemail',
                    fieldLabel: "Địa chỉ Email (<span style = 'color: red'>*</span>)",
                    vtype: 'email',
                    msgTarget: 'side',
                    allowBlank: false,
                    flex: 1,
                    bind: {
                        value: '{regemail}'
                    }   
                }   
            ]
        },
        {
            xtype: 'container',
            padding: 2,
            layout: 'hbox',
            width: '100%',
            height: '25%',
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Điện thoại liên hệ (<span style = 'color: red'>*</span>)",
                    labelAlign: 'top',
                    name: 'regtel',
                    allowBlank: false,
                    flex: 1,
                    bind: {
                        value: '{regtel}'
                    }                       
                },
                {
                    xtype: 'textfield',
                    margin: 2,
                    labelAlign: 'top',
                    name: 'regorg',
                    fieldLabel: "Tên công ty (<span style = 'color: red'>*</span>)",
                    allowBlank: false,
                    flex: 1,
                    bind: {
                        value: '{regorg}'
                    }   
                }   
            ]
        },
        {
            xtype: 'container',
            padding: 2,
            layout: 'hbox',
            width: '100%',
            height: '50%',
            items: [
                {
                    xtype: 'textareafield',
                    margin: 2,
                    fieldLabel: "Ghi chú",
                    labelAlign: 'top',
                    name: 'regcomment',
                    allowBlank: true,
                    flex: 1,
                    bind: {
                        value: '{regcomment}'
                    }   
                },
            ]
        }           
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        },{
            xtype:'button',
            formBind: true,
            text: 'Gửi đăng ký',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },
        // {
        //     xtype: 'button',
        //     text: 'Thoát',
        //     itemId: 'btnThoat',
        //     iconCls: 'x-fa fa-window-close',
        //     margin: 5
        // }
        ]
    }]
});