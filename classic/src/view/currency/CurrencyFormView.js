Ext.define('GSmartApp.view.currency.CurrencyFormView', {
    extend: 'Ext.form.Panel',
    xtype: 'CurrencyFormView',
    id:'CurrencyFormView',
    controller: 'CurrencyFormViewController',
    layout: 'vbox',
    bind:{
        title: '{title}'
    },
    items: [{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên viết tắt ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 5,
        maxLengthText: 'Tối đa 5 ký tự',
        bind:{
            value :'{currentRec.code}'
        },
        width: 400,
        labelWidth: 105,
        listeners: {
            afterrender: function(field) {
              field.focus(false, 1000);
            }
        },
        itemId:'code',
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên ngoại tệ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        bind:{
            value :'{currentRec.name}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'numberfield',
        margin: 5,
        fieldLabel: 'Tỉ giá trao đổi (VND)('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        minValue: 0,
        bind:{
            value :'{currentRec.exchangerate}'
        },
        hideTrigger:true,
        fieldStyle:{
            'text-align':'right',
            'color': 'blue'
        },
        width: 400,
        labelWidth: 105
    },{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'checkbox',
        fieldLabel: 'Hoạt động ',
        inputValue:1,
        uncheckedValue:-1,
        // checked:true,
        bind: {
            value:'{currentRec.status}'
        }
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thêm ngoại tệ',
            margin: 3,
            itemId:'btnThem',
            iconCls: 'x-fa fa-plus',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})