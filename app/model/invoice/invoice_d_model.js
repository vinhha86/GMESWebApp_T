Ext.define('GSmartApp.model.invoice.invoice_d_model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idx'},
		{name: 'orgrootid_link',  type: 'int'},
        {name: 'invoiceid_link',   type: 'int'},
        {name: 'skuid_link',   type: 'int'},
        {name: 'colorid_link',   type: 'int'},
        {name: 'unitid_link', type: 'int'},
        {name: 'totalpackage'},
        {name: 'netweight'},
        {name: 'grossweight'},
        {name: 'foc'},
        {name: 'yds'},
		{name: 'unitprice',   type: 'number'},
        {
            name: 'totalamount',
            calculate: function(data) {
                var price = data.unitprice == null ? 0 :  data.unitprice;
                var amount = data.totalpackage == null ? 0 :  data.totalpackage;
                return price * amount;
            }
        },   
		{name: 'usercreateid_link',   type: 'int'},
		{name: 'timecreate',   type: 'date', dateFormat: 'c'},
        {name: 'lastuserupdateid_link',   type: 'int'},
        {name: 'lasttimeupdate',   type: 'date', dateFormat: 'c'},
        'm3',
        'sizeid_link',
        'skuname',
        'skucode',
        'color_name',
        'size_name',
        'unit_name'
    ],
    // hasMany : {model: 'invoice_d_model', name: 'invoice_d'}
});