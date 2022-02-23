Ext.define('GSmartApp.view.factory.FactoryDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'FactoryDetailView',
    id:'FactoryDetailView',
    controller: 'FactoryDetailViewCotroller',
    viewModel:{
        type:'FactoryViewModel'
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
        bind:{
            value :'{currentRec.code}'
        },
        width: 400,
        itemId: 'code',
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Đơn vị ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.name}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Điện thoại',
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
        bind:{
            value :'{currentRec.email}'
        },
        vtype: 'email',
        vtypeText : 'Bạn phải nhập đúng định dạng email. Ví dụ abc@123',
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Thành phố',
        bind:{
            value :'{currentRec.city}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textareafield',
        margin: 5,
        fieldLabel: 'Địa chỉ',
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
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})