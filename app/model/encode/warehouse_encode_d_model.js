Ext.define('GSmartApp.model.encode.warehouse_encode_d_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'orgrootid_link',
        'warehouse_encodeid_link',
        'skucode',
        'skuname',
        'product_code',
        'skuid_link',
        'usercreatedid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'totalencode',
        'color_name',
        'size_name'
    ]
});
