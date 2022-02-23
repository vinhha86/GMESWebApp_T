Ext.define('GSmartApp.view.cut_plan.Detail.ThemLoaiPhoiView', {
    extend: 'Ext.form.Panel',
    xtype: 'ThemLoaiPhoiView',
    itemId: 'ThemLoaiPhoiView',
    controller: 'ThemLoaiPhoiViewController',
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Loại phối màu',
        margin: 5,
        bind: {
            value: '{loaiphoi}'
        }
    }],
    dockedItems: [{
        layout: 'hbox',
        dock: 'bottom',
        border: false,
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
});

