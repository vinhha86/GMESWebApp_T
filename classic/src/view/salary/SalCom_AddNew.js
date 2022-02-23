Ext.define('GSmartApp.view.salary.SalCom_AddNew', {
    extend: 'Ext.form.Panel',
    xtype: 'SalCom_AddNew',
    id: 'SalCom_AddNew',
    controller: 'SalCom_AddNew_Cotroller',
    viewModel : {
        type: 'SalCom_AddNew_Model'
    },
    bodyPadding: 5,
    border: false,
    items: [{
        layout: 'vbox',
        border: false,
        items: [{
            xtype: 'textfield',
            allowBlank: false,
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Mã phụ cấp',
            labelAlign: 'left',
            labelWidth: 100,
            width: '100%',
            margin: 2,
            bind: {
                value: '{code}'
            }                           
        },{
            xtype: 'textfield',
            allowBlank: false,
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Tên phụ cấp',
            labelAlign: 'left',
            labelWidth: 100,
            width: '100%',
            margin: 2,
            bind: {
                value: '{name}'
            }
        },
        {
            xtype: 'numberfield',
            allowDecimals: true,
            hideTrigger: true,
            fieldLabel: 'Hệ số',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            width: '100%',
            margin: 2,
            bind: {
                value: '{comratio}'
            },
            textAlign: 'right',
            labelAlign: 'left',
            listeners:{
                focusleave: 'onUpdateComRatio'
            }
        },
        {
            xtype: 'textfield',
            itemId: 'sal_basic',
            labelWidth: 100,
            fieldLabel: 'Phụ cấp',
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            width: '100%',
            margin: 2,
            bind: {
                value: '{comamount}'
            },
            vtype: 'dollar',
            textAlign: 'right',
            labelAlign: 'left'
        },
    ]
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items:[{
            flex: 1,
            border: false
        },{
            xtype: 'button',
            margin: 5,
            text: 'Xác nhận',
            iconCls: 'x-fa fa-check',
            itemId: 'btnXacNhan',
            formBind: true
        },{
            xtype: 'button',
            margin: 5,
            text: 'Thoát',
            iconCls: 'x-fa fa-window-close',
            itemId: 'btnThoat'
        }]
    }]
})