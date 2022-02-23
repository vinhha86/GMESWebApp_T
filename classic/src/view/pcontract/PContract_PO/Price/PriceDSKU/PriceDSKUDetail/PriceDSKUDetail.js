Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PriceDSKUDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'PriceDSKUDetail',
    id:'PriceDSKUDetail',
    controller: 'PriceDSKUDetailController',
    layout: 'vbox',
    width: '100%',
    items: [{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Giá/KG',
        reference: 'price_per_kg',
        allowBlank: true,
        maskRe: /[0-9.]/,
        bind:{
            value :'{price_per_kg}'
        },
        fieldStyle:{
            'text-align':'right'
        },
        width: '100%',
        flex: 1,
        labelWidth: 90,
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'M/KG',
        reference: 'm_per_kg',
        allowBlank: true,
        maskRe: /[0-9.]/,
        bind:{
            value :'{m_per_kg}'
        },
        fieldStyle:{
            'text-align':'right'
        },
        width: '100%',
        flex: 1,
        labelWidth: 90,
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Giá/M',
        reference: 'price_per_m',
        allowBlank: true,
        maskRe: /[0-9.]/,
        bind:{
            value :'{price_per_m}'
        },
        fieldStyle:{
            'text-align':'right'
        },
        width: '100%',
        flex: 1,
        labelWidth: 90,
    },{
        xtype: 'combo',
        labelWidth: 90,
        fieldLabel: 'Ngoại tệ',
        bind: {
            store : '{CurrencyStore}',
            // value: '{currencyid_link}'
        },
        displayField: 'code',
        valueField: 'id',
        itemId: 'currencyid_link',
        reference: 'currencyid_link',
        queryMode: 'local',
        anyMatch: true,
        margin: 5,
        width: '100%',
        flex: 1,
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            flex:1,
            border: false
        },{
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
        }]
    }]
})