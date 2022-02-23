Ext.define('GSmartApp.view.login.Login', {
    extend: 'Ext.Container',
    alias: 'widget.login-panel',

    requires: [
        'GSmartApp.view.login.LoginViewController',
        'GSmartApp.view.login.LoginViewModel',
        'Ext.form.Panel',
        'Ext.Container',
        'Ext.Label',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.Button'
    ],

    controller: 'loginViewCtrl',
    viewModel: {
        type: 'login'
    },
    id: 'auth-login',

    masked: {
        xtype: 'loadmask',
        message: '',
        indicator: false,
        html: "<img src='resources/images/loading_icon.gif'/>"
    },

    items: [
        {
            xtype: 'container',
            centered: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: 10,
            items: [
                {
                    xtype: 'formpanel',
                    padding: 10,
                    items: [{
                            xtype: 'label',
                            id: 'login-form-error-label',
                            html: 'Sai tên đăng nhập hoặc mật khẩu',
                            hidden: true,
                            margin: '10 0 10 0',
                            padding: '0 0 10 0'
                        },
                        {
                            xtype: 'label',
                            style: 'font-size: 20px; text-align: center',
                            html: 'Đăng nhập G-MES',
                            margin: '10 0 0 0',
                            padding: '0 0 10 0'
                        },
                        {
                            xtype: 'textfield',
                            name: 'username',
                            scrollable: false,
                            label: 'Tên đăng nhập',
                            labelWidth: '40%',
                            required: true,
                            errorTarget: 'side',
                            keyMapEnabled: true
                        },
                        {
                            xtype: 'passwordfield',
                            name: 'password',
                            scrollable: false,
                            label: 'Mật khẩu',
                            labelWidth: '40%',
                            required: true,
                            errorTarget: 'side'
                        }
                    ],
                    buttonAlign: 'center',
                    buttons: [{
                        text: 'Đăng nhập',
                        iconCls: 'x-fa fa-angle-right',
                        handler: 'onLoginClick',
                        formBind: true,
                        margin: '20 0 0 0'
                    }]
                }
            ]
        }
    ],
    listeners: {
        initialize: 'initKeyMappings'
    }
});