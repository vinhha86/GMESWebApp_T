Ext.define('GSmartApp.model.encode.porder_encode_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'porderid_link',
        'porder_code',
        'deviceid_link',
        {name: 'encode_date', type: 'date', dateFormat: 'c'},
        'device_name',
        'skuid_link',
        'skucode',
        'encode_amount',
        'status',
        'status_name',
        'usercreateid_link',
        'usercreate_name',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'session_code'
    ]
});
