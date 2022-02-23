Ext.define('GSmartApp.model.Stockout_pklist', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id',type: 'int'},
        'orgrootid_link',
        'stockoutid_link',
        'stockoutdid_link',
        'skuid_link',
        'skucode',
        'skutype',
        'skutypeid_link',
        'colorid_link',
        'color_name',
        'color_code',
        'unitid_link',
        'lotnumber',
        'packageid',
        'ydsorigin',
        'ydsoriginold',
        'ydscheck',
        'ydscheckold',
        'ydsprocessed',
        'ydsprocessedold',
        'widthorigin',
        'widthoriginold',
        'widthcheck',
        'widthcheckold',
        'widthprocessed',
        'widthprocessedold',
        'totalerror',
        'totalerrorold',
        'netweight',
        'grossweight',
        'epc',
        'rssi',
        'status',
        'extrainfo',
        {name: 'encryptdatetime', type: 'date', dateFormat: 'c'},
        'usercheckid_link',
        {name: 'timecheck', type: 'date', dateFormat: 'c'},
        'userprocessedkid_link',
        {name: 'timeprocessed', type: 'date', dateFormat: 'c'},
        'usercreateid_link',
        {name: 'timecreate', type: 'date', dateFormat: 'c'},
        'lastuserupdateid_link',
        {name: 'lasttimeupdate', type: 'date', dateFormat: 'c'},
        {
            name: 'dif_checked',
            calculate: function(data) {
                return data.ydscheck - data.ydsorigin;
                // return Ext.Number.toFixed(data.ydscheck - data.ydsorigin,2);
            }
        }, 
        {
            name: 'dif_processed',
            calculate: function(data) {
                return data.ydsprocessed - data.ydsorigin;
            }
        },
        'met_origin',
        'met_check',
        'met_processed',             
    ]
});
