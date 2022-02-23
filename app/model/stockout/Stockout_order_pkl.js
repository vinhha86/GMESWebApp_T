Ext.define('GSmartApp.model.stockout.Stockout_order_pkl', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        // {name: 'idx', type: 'int'},
        {name: 'idx'},
        'orgid_link',
        'stockoutorderid_link',
        'stockoutorderdid_link',
        'skuid_link',
        'colorid_link',
        'lotnumber',
        'packageid',
        'ydsorigin',
        'ydscheck',
        'width',
        'netweight',
        'grossweight',
        'epc',
        'encryptdatetime',
        'usercreateid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        'spaceepc_link'
    ]
});
