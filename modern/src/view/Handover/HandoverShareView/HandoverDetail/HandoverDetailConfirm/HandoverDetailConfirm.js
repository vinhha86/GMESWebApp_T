Ext.define('GSmartApp.view.handover.HandoverDetailConfirm', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverDetailConfirm',
    id:'HandoverDetailConfirm',
    reference: 'HandoverDetailConfirm',
    viewModel: {
        type: 'HandoverSkuAmountViewModel'
    },
    controller: 'HandoverDetailConfirmController',
    
    layout : 'center',
    flex: 1,
    autoSize: true,

    requires: [
        'Ext.Toast'
    ],

    items: [{
        xtype: 'textfield',
        margin: '3',
        // reference: 'cboorgto',
        // editable: false,
        // readOnly: true,
        bind:{
            value:'{username}'
        },
        // label: 'Tên đăng nhập:',
        placeholder: 'Tên đăng nhập',
        // textAlign: 'right',
        hideTrigger:true,
        clearable: false,
        // labelWidth: 120,
        // width: 220,
        flex: 1,
    },{
        xtype: 'textfield',
        margin: '3',
        // reference: 'cboorgto',
        // editable: false,
        // readOnly: true,
        bind:{
            value:'{password}'
        },
        // label: 'Mật khẩu:',
        placeholder: 'Mật khẩu',
        // textAlign: 'right',
        hideTrigger:true,
        clearable: false,
        inputType: 'password',
        // labelWidth: 100,
        // width: 220,
        flex: 1,
    }],

    buttons: [{
        text: 'Thoát',
        // iconCls: 'x-fa fa-window-close',
        itemId: 'btnThoat'
    },{
        text: 'Xác thực',
        // iconCls: 'x-fa fa-check',
        itemId: 'btnLuu'
    }]
})