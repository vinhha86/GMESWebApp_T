Ext.define('GSmartApp.view.org.ListOrgDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ListOrgDetail',
    id:'ListOrgDetail',
    controller: 'ListOrgDetailController',
    layout: 'vbox',
    bind:{
        title: '{title}',
        hidden : '{!fieldState}'
    },
    // orgtypeid_link, parentid_link, linecost, colorid_link
    items: [{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Loại đơn vị ('+ '<span style="color:red">*</span>' + ')',
        bind:{
            store:'{OrgTypeStore}',
            value:'{orgtypeid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        editable: false,
        allowBlank: false,
        readOnly: true
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên tắt ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{code}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên đơn vị ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            value :'{name}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Thành phố ',
        allowBlank: true,
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{city}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Địa chỉ ',
        allowBlank: true,
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            value :'{address}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Người đại diện ',
        allowBlank: true,
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{contactperson}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Email ',
        allowBlank: true,
        vtype: 'email',
        vtypeText : 'Bạn phải nhập đúng định dạng email. Ví dụ name@example.com',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{email}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Điện thoại ',
        allowBlank: true,
        maskRe: /[0-9+-]/,
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value :'{phone}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'numberfield',
        margin: 5,
        fieldLabel: 'Line Cost ',
        allowBlank: true,
        hideTrigger:true,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            'color': 'blue'
        },
        bind:{
            value :'{linecost}'
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
            value:'{colorid_link}'
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
    },{
        xtype:'numberfield',
        margin: 5,
        fieldLabel: 'Đơn giá/ giây',
        allowBlank: true,
        hideTrigger:true,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            'color': 'blue'
        },
        bind:{
            value :'{costpersec}',
            visible: '{isProductionLine}'
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
            value:'{status}'
        }
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            // xtype:'button',
            // text: 'Thêm đơn vị trực thuộc',
            // margin: 3,
            // itemId:'btnThemDonViTrucThuoc',
            // iconCls: 'x-fa fa-plus',
            // formBind: false,
            // bind:{
            //     disabled:'{btnThemState}'
            // }
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
        },{
            xtype:'button',
            text: 'Xoá',
            margin: 3,
            itemId:'btnXoa',
            iconCls: 'x-fa fa-trash',
            bind: {
                hidden: '{isBtnXoaHidden}'
            }
        },]
    }]
})