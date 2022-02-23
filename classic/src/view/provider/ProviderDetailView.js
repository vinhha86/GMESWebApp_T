Ext.define('GSmartApp.view.provider.ProviderDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProviderDetailView',
    id:'ProviderDetailView',
    controller: 'ProviderDetailViewCotroller',
    viewModel:{
        type:'ProviderViewModel'
    },
    layout: 'vbox',
    bind:{
        title: '{title}'
    },
    items: [{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên tắt ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.code}'
        },
        width: 400,
        itemId: 'code',
        labelWidth: 105,
        listeners: {
            afterrender: function(field) {
              field.focus(false, 1000);
            }
        }
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Nhà cung cấp ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            value :'{currentRec.name}'
        },
        width: 400,
        itemId: 'name',
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Điện thoại',
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value :'{currentRec.phone}'
        },
        maskRe: /[0-9+-]/,
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Email',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.email}'
        },
        vtype: 'email',
        vtypeText : 'Bạn phải nhập đúng định dạng email. Ví dụ name@example.com',
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Thành phố',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.city}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textareafield',
        margin: 5,
        fieldLabel: 'Địa chỉ',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            value :'{currentRec.address}'
        },
        width: 400,
        labelWidth: 105
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            xtype:'button',
            text: 'Lưu và tạo mới',
            margin: 3,
            itemId:'btnLuuVaTaoMoi',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})