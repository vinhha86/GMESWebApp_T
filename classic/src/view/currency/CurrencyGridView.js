Ext.define('GSmartApp.view.currency.CurrencyGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CurrencyGridView',
    id: 'CurrencyGridView',
    controller: 'CurrencyGridViewController',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    reference: 'CurrencyGridView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{CurrencyStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'currencyCodeFilter',
            width: 96,
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onCurrencyCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tên',
        dataIndex: 'name',
        width: 150,
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'currencyNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onCurrencyNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Tỉ giá (VND)',
        dataIndex: 'exchangerate',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000.00');
        },
        width: 150,
        flex: 1,
        align: 'end'
    }]
});

