Ext.define('GSmartApp.view.holiday.HolidayFormView', {
    extend: 'Ext.form.Panel',
    xtype: 'HolidayFormView',
    id:'HolidayFormView',
    controller: 'HolidayFormViewController',
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: '100%',
        items: [{
            xtype:'datefield',
            margin: 5,
            fieldLabel: 'Từ ngày',
            reference: 'startdate',
            format: 'd/m/Y',
            allowBlank: false,
            flex:1,
            labelWidth: 90,
            listeners: {
                change: 'onChange'
            }
        },{
            xtype:'datefield',
            margin: 5,
            fieldLabel: 'Đến ngày',
            reference: 'enddate',
            format: 'd/m/Y',
            allowBlank: false,
            flex:1,
            labelWidth: 90,
            disabled: true
        }]
    },{
        xtype:'textarea',
        margin: 5,
        fieldLabel: 'Nội dung ('+ '<span style="color:red">*</span>' + ')',
        reference: 'comment',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 200,
        maxLengthText: 'Tối đa 200 ký tự',
        width: '100%',
        flex: 1,
        labelWidth: 90
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
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