Ext.define('GSmartApp.model.encode.warehouse_encode_epc_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'orgencodeid_link',
        'epc',
        'oldepc',
        'tid',
        'skuid_link',
        'deviceid_link',
        'usercreatedid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        'status',
        'warehouse_encodeid_link',
        'warehouse_encodedid_link'
    ]
});
