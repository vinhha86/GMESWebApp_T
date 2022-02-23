Ext.define('GSmartApp.model.POrderSubProcessing', {
    extend: 'GSmartApp.model.Base',

    fields: [
        {name: 'id', type: 'int'},
        'orgid_link',
        'porderid_link', 
        'ordercode',
        'workingprocessid_link',
        'workingprocessname',
        'status',
        'usercreateid_link',
        'timecreate',
        {name: 'isselected', type: 'bool'}
    ]
});
