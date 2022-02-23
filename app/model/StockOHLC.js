Ext.define('GSmartApp.model.StockOHLC', {
    extend: 'GSmartApp.model.Base',

    fields: [
        'company',
        'time',
        'open',
        'high',
        'low',
        'close'
    ]
});
