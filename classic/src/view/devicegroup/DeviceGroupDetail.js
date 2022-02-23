Ext.define('GSmartApp.view.devicegroup.DeviceGroupDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'DeviceGroupDetail',
    id:'DeviceGroupDetail',
    controller: 'DeviceGroupDetailController',
    layout: 'vbox',
    bind:{
        title: '{title}',
        hidden : '{!fieldState}'
    },
    // orgtypeid_link, parentid_link, linecost, colorid_link
    items: [{
        xtype:'textfield',
        margin: 5,
        // fieldLabel: 'Mã nhóm thiết bị ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        bind:{
            fieldLabel: '{codeLabel}',
            value :'{code}'
        },
        width: 400,
        labelWidth: 135
    },{
        xtype:'textfield',
        margin: 5,
        // fieldLabel: 'Tên nhóm thiết bị ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        bind:{
            fieldLabel: '{nameLabel}',
            value :'{name}'
        },
        width: 400,
        labelWidth: 135
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
        },]
    }]
})