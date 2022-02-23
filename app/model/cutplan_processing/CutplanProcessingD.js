Ext.define('GSmartApp.model.cutplan_processing.CutplanProcessingD', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'cutplan_processingid_link',
        'warehouseid_link',
        'epc',
        'barcode',
        'lotnumber',
        'packageid',
        'met',
        'la_vai',
        'tieu_hao',
        'con_lai',
        'ps',
        {name: 'timecreated', type: 'date', dateFormat: 'c'},
    ],
});