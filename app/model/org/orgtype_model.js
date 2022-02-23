Ext.define('GSmartApp.model.org.orgtype_model', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
		{name: 'name',},
		{name: 'name_en'},
       
    ],
    // hasMany : {model: 'invoice_d_model', name: 'invoice_d'}
});