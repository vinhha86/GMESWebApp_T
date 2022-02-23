Ext.define('GSmartApp.view.currency.CurrencyMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'CurrencyMainView',
    id:'CurrencyMainView',
    viewModel:{
        type:'CurrencyViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'west',
        width: '50%',
        title: 'Danh sách ngoại tệ',
        xtype: 'CurrencyGridView',
        border: true,
        margin: 1
    
    }, {
        region: 'east',
        width: '50%',
        title: 'Thông tin chi tiết',
        xtype: 'CurrencyFormView',
        border: true,
        margin: 1
    }]

})