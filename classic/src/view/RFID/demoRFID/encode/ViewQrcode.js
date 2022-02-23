Ext.define('GSmartApp.view.RFID.demoRFID.encode.ViewQrcode', {
    extend: 'Ext.form.Panel',
    xtype: 'ViewQrcode',
    id: 'ViewQrcode',
    controller: 'ViewQrcodeController',
    viewModel: {
        type: 'ViewQrcode_ViewModel'
    },
    layout: 'vbox',
    items: [{
        xtype: 'image',
        itemId: 'qrperson',
        width: 200,
        height: 200,
        margin: 1,
        bind: {
            src: "{qrcode_demo}"
        },
        listeners: {
            afterrender: function (img, a, obj) {
                img.getEl().dom.style.border = '1px solid black';
            }
        }
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: true,
        items: [{
            xtype: 'button',
            margin: 3,
            itemId: 'btnThoat',
            text: 'Thoát',
            iconCls: 'x-fa fa-window-close'
        }
        ]
    }]
});

