Ext.define('GSmartApp.model.stockin.Stockin_pklist', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        { name: 'idx' },
        { name: 'id', type: 'int' },
        'orgrootid_link',
        'stockinid_link',
        'stockindid_link',
        'skuid_link',
        'colorid_link',
        'sizeid_link',
        'lotnumber',
        'packageid',
        'ydsorigin',
        'ydscheck',
        'width',
        'netweight',
        'grossweight',
        'epc',
        {
            name: 'encryptdatetime', type: 'date', dateFormat: 'c'
        },
        'usercreateid_link',
        'usercreate_name',
        { name: 'timecreate', type: 'date', dateFormat: 'c' },
        'lastuserupdateid_link',
        { name: 'lasttimeupdate', type: 'date', dateFormat: 'c' },
        'unitid_link',
        'skutypeid_link',
        'rssi',
        'status',
        'extrainfo',
        'met_origin',
        'met_check'
    ]
});
