Ext.define('GSmartApp.model.invoice.invoice_packinglist', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
        {name: 'invoiceid_link',   type: 'int'},
        {name: 'invoicedid_link',   type: 'int'},
        {name: 'skuid_link',   type: 'int'},
        {name: 'colorid_link',   type: 'int'},
        {name: 'unitid_link', type: 'int'},
        'lotnumber',
        'packageid',
        'ydsorigin',
        'ydscheck',
        'width',
        'netweight',
        'grossweight',
        'sizenumber'
    ],
    // hasMany : {model: 'invoice_d_model', name: 'invoice_d'}
});