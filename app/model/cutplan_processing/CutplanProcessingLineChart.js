Ext.define('GSmartApp.model.CutplanProcessingLineChart', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idx', type: 'int'},
        {name: 'amountcut', type: 'number'},
        {name: 'processingdate', type: 'date', dateFormat: 'c'},
        {
            name: 'processingdate_str',
            calculate: function(data) {
                return Ext.Date.format(data.processingdate,'d/m/y');
            }
        },       
    ]
});
