Ext.define('GSmartApp.view.RFID.demoRFID.inv.inv_create_View', {
    extend: 'Ext.form.Panel',
    xtype: 'inv_create_View',
    id: 'inv_create_View',
    controller: 'inv_create_ViewCotroller',
    viewModel: {
        type: 'inv_create_ViewModel'
    },
    layout: 'vbox',
    items: [{
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Mã kho',
        bind: {
            value: '{inv.codename}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        fieldLabel: 'Tên kho',
        width: '100%',
        bind: {
            value: '{inv.storename}'
        }
    }, {
        xtype: 'combo',
        margin: 5,
        width: '100%',
        fieldLabel: 'Loại kho',
        bind: {
            value: '{inv.storetype_id}',
            store: '{StoreType}'
        },
        valueField: 'id',
        displayField: 'name'
    }],
    dockedItems: [{
        layout: 'hbox',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            margin: 3,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, {
            xtype: 'button',
            text: 'Lưu',
            margin: 3,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})