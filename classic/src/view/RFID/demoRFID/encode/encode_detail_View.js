Ext.define('GSmartApp.view.RFID.demoRFID.inv.encode_detail_View', {
    extend: 'Ext.form.Panel',
    xtype: 'encode_detail_View',
    id: 'encode_detail_View',
    controller: 'encode_detail_ViewCotroller',
    viewModel: {
        type: 'encode_detail_ViewModel'
    },
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'combo',
            valueField: 'deviceid',
            displayField: 'devicename',
            margin: 3,
            fieldLabel: 'Thiết bị',
            bind: {
                store: '{device_store}'
            },
            itemId: 'cmbDevice'
        }]
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
            margin: 3,
            itemId: 'btnPrint',
            iconCls: 'x-fa fa-print',
            bind: {
                text: '{textbtn}'
            }
        }]
    }]
})