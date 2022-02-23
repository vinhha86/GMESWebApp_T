Ext.define('GSmartApp.view.salary.SalType_AddNew', {
    extend: 'Ext.form.Panel',
    xtype: 'SalType_AddNew',
    id: 'SalType_AddNew',
    controller: 'SalType_AddNew_Cotroller',
    viewModel : {
        type: 'SalType_AddNew_Model'
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
            fieldLabel: 'Mã ngạch lương',
            labelAlign: 'left',
            labelWidth: 100,
            width: '100%',
            margin: 2,
            bind: {
                value: '{saltype_code}'
            }                           
        },{
            xtype: 'textfield',
            allowBlank: false,
            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
            fieldStyle: 'font-size:11px;',
            fieldLabel: 'Tên ngạch lương',
            labelAlign: 'left',
            labelWidth: 100,
            width: '100%',
            margin: 2,
            bind: {
                value: '{saltype_name}'
            }
        }]
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