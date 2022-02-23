Ext.define('GSmartApp.model.cutplan_processing.CutplanProcessing', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        { name: 'idx', type: 'number' },
        { name: 'id' },
        { name: 'orgrootid_link', type: 'number' },
        { name: 'processingdate', type: 'date' , dateFormat: 'c', format: 'd/m/y'},
        { name: 'cutplanrowid_link', type: 'number' },
        { name: 'cutorgid_link', type: 'number' },
        { name: 'amountcut', type: 'number' },
        { name: 'status', type: 'number' },
        { name: 'usercreatedid_link', type: 'number' },
        { name: 'timecreated', type: 'date' , dateFormat: 'c'},
    ],
    hasMany : {model: 'CutplanProcessingD', name: 'cutplanProcessingD'}
});