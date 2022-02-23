Ext.define('GSmartApp.model.invoice.invoice_model', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
        {name: 'invoicenumber',   type: 'string'},
        {name: 'invoicedate',   type: 'date', dateFormat: 'c'},
        {name: 'org_prodviderid_link',   type: 'int'},
        {name: 'orgid_to_link', type: 'int'},
        {name: 'org_portfromid_link'},
        {name: 'org_porttoid_link'},
        {name: 'shipdatefrom', type: 'date', dateFormat: 'c'},
        {name: 'shipdateto',   type: 'date', dateFormat: 'c'},
        {name: 'org_customerid_link',   type: 'int'},
		{name: 'custom_declaration',   type: 'string'},
		{name: 'declaration_date',   type: 'date', dateFormat: 'c'},
		{name: 'shippersson',   type: 'string'},
		{name: 'extrainfo',   type: 'string'},
		{name: 'usercreateid_link',   type: 'int'},
		{name: 'timecreate',   type: 'date', dateFormat: 'c'},
        {name: 'lastuserupdateid_link',   type: 'int'},
        {name: 'lasttimeupdate',   type: 'date', dateFormat: 'c'},
        'status',
        {
            name: 'status_name',
            calculate: function(data) {
                if(data.status == 1){
                    return "Đang lập"
                }
                else if (data.status== 2){
                    return "Đã xác nhận"
                }
            }
        },   
        {name: 'stockout_date', type: 'date', dateFormat: 'c'},
        'orgfrom_name',
        'totalpackage',
        'totalm3',
        'totalgrossweight'
    ],
    hasMany : {model: 'invoice_d_model', name: 'invoice_d'}
});