Ext.define('GSmartApp.view.unit.UnitDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'UnitDetailView', // same with database, 'PortDetailView' shows error
    id:'UnitDetailView',
    controller: 'UnitDetailViewController',
    viewModel:{
        type:'UnitViewModel'
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
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
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
        fieldLabel: 'Tên đơn vị ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        bind:{
            value :'{currentRec.name}'
        },
        width: 400,
        itemId: 'name',
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên đơn vị tiếng Anh ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        bind:{
            value :'{currentRec.name_en}'
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