Ext.define('GSmartApp.model.WorkingProcess', {
    extend: 'GSmartApp.model.Base',

    fields: [
        {name: 'id', type: 'int'},
        'orgid_link',
        'name', 
        'parentid_link',
        'productid_link',
        'timespent_standard',
        'devicerequiredid_link',
        'devicerequired_desc',
        'laborrequiredid_link',
        'laborrequired_desc',
        'techcomment',
        'process_type',
        'status',
        'usercreateid_link',
        'timecreate',
        {name: 'isselected', type: 'bool'}
    ]
});
