Ext.define('GSmartApp.model.stockout.Stockout_order_d', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        { name: 'id' },
        { name: 'idx', type: 'int' },
        'orgid_link',
        'stockoutorderid_link',
        'material_skuid_link',
        'colorid_link',
        'unitid_link',
        'totalpackage',
        'totalyds',
        'totalpackagecheck',
        'totalydscheck',
        'unitprice',
        'p_skuid_link',
        'usercreateid_link',
        { name: 'timecreate', type: 'date', dateFormat: 'c' },
        'lastuserupdateid_link',
        { name: 'lasttimeupdate', type: 'date', dateFormat: 'c' },
        'unitid_link'
    ]
});
