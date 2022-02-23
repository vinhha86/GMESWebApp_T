Ext.define('GSmartApp.view.RFID.demoRFID.encode.encode_View', {
    extend: 'Ext.form.Panel',
    xtype: 'encode_View',
    id: 'encode_View',
    controller: 'encode_ViewController',
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Name',
            bind: {
                disabled: '{!type.en_name}',
                value: '{encode.name}'
            }
        }, {
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Code',
            bind: {
                disabled: '{!type.en_code}',
                value: '{encode.code}'
            }
        }]
    }, {
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Lot',
            bind: {
                disabled: '{!type.en_lot}',
                value: '{encode.lot}'
            }
        }, {
            xtype: 'datefield',
            fieldLabel: 'Exp:',
            margin: 3,
            format: 'd/m/y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            editable: false,
            bind: {
                value: '{po.productiondate}',
                disabled: '{!type.en_exp}',
                value: '{encode.exp}'
            }
        }]
    }, {
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            margin: 3,
            fieldLabel: 'Qty',
            maskRe: /[0-9]/,
            bind: {
                disabled: '{!type.en_qty}',
                value: '{encode.qty}'
            }
        }]
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: true,
        items: [{
            xtype: 'combo',
            margin: 3,
            fieldLabel: 'Loại kho',
            displayField: 'name',
            valueField: 'id',
            itemId: 'cmbLoaiKho',
            bind: {
                store: '{StoreType}'
            }
        }, {
            xtype: 'button',
            margin: 3,
            text: 'In nhãn',
            itemId: 'btnIn',
            iconCls: 'x-fa fa-print'
        }, {
            xtype: 'button',
            margin: 3,
            itemId: 'btnInEncode',
            text: 'In nhãn & Mã hóa',
            iconCls: 'x-fa fa-print'
        }, {
            xtype: 'button',
            margin: 3,
            itemId: 'btnEncode',
            text: 'Mã hóa',
            iconCls: 'x-fa fa-print'
        },{
            xtype: 'button',
            margin: 3,
            itemId: 'btnViewQrcode',
            text: 'Hiện QRCode',
            iconCls: 'x-fa fa-print'
        }
    ]
    }]
});

