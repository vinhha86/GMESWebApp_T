Ext.define('GSmartApp.view.endbuyer.EndBuyerDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'EndBuyerDetailView', // same with database, 'PortDetailView' shows error
    id:'EndBuyerDetailView',
    controller: 'EndBuyerDetailViewController',
    viewModel:{
        type:'EndBuyerViewModel'
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
        fieldLabel: 'Tên end buyer ('+ '<span style="color:red">*</span>' + ')',
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
        fieldLabel: 'Thành phố',
        allowBlank: true,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.city}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Địa chỉ',
        allowBlank: true,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            value :'{currentRec.address}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Người đại diện',
        allowBlank: true,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.contactperson}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Email',
        allowBlank: true,
        blankText : 'Không được để trống',
        vtype: 'email',
        vtypeText : 'Bạn phải nhập đúng định dạng email. Ví dụ name@example.com',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{currentRec.email}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Phone',
        allowBlank: true,
        blankText : 'Không được để trống',
        maskRe: /[0-9+-]/,
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value :'{currentRec.phone}'
        },
        width: 400,
        labelWidth: 105
    },{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Màu đại diện ',
        bind:{
            store:'{ColorStore}',
            value:'{currentRec.colorid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        tpl: [
            '<ul class="x-list-plain">',
            '<tpl for=".">',
            // '<div class="x-combo-list-item">',
            // '<div style="height: 16px; width: 16px; border: 1px solid #777777; display: inline-block; background-color:{rgbvalue}"></div>',
            // '&nbsp&nbsp{name}',
            // '</div>',
            '<li class="x-boundlist-item listItmes"',
            // 'style="background-color: {rgbvalue}">',
            '<div style="display: flex; align-items: center;">',
            '<div style="height: 16px; width: 16px; border: 1px solid #777777; display: inline-block; background-color:{rgbvalue}"></div>',
            '&nbsp&nbsp{name}',
            '</div>',
            '</li>',
            '</tpl>',
            '</ul>'
        ],
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