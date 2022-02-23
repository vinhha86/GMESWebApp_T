Ext.define('GSmartApp.model.stockin.Stockin', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        { name: 'idx', type: 'number' },
        { name: 'id' },
        { name: 'orgrootid_link', type: 'number' },
        { name: 'stockincode', type: 'string' },
        { name: 'stockindate', type: 'date' , dateFormat: 'c', format: 'd/m/y'},
        { name: 'stockintypeid_link', type: 'number' },
        { name: 'stockintype_name', type: 'string' },
        { name: 'porderid_link', type: 'number' },
        { name: 'pordercode', type: 'string' },
        { name: 'p_skuid_link', type: 'number' },
        { name: 'invoice_number', type: 'string' },
        { name: 'invoice_paymentype', type: 'string' },
        { name: 'invoice_date', type: 'date' , dateFormat: 'c'},
        { name: 'invoice_paymentdue', type: 'int' },
        { name: 'vat_typeid_link', type: 'number' },
        { name: 'vat_sample', type: 'string' },
        { name: 'vat_symbol', type: 'string' },
        { name: 'vat_number', type: 'string' },
        { name: 'vat_date', type: 'date' , dateFormat: 'c'},
        { name: 'vat_currencyid_link', type: 'number' },
        { name: 'vat_exchangerate', type: 'number' },
        { name: 'vat_paymentduedate', type: 'date', dateFormat: 'c' },
        { name: 'contract_number', type: 'string' },
        { name: 'stockoutid_link', type: 'number' },
        { name: 'orgid_from_link', type: 'number' },
        { name: 'orgid_to_link', type: 'number' },
        { name: 'shipperson', type: 'string' },
        { name: 'totalpackage', type: 'int' },
        { name: 'totalm3', type: 'number' },
        { name: 'totalnetweight', type: 'number' },
        { name: 'totalgrossweight', type: 'number' },
        { name: 'reason', type: 'string' },
        { name: 'extrainfo', type: 'string' },
        { name: 'status', type: 'int' },
        { name: 'usercreateid_link', type: 'number' },
        { name: 'usercreate_name', type: 'string' },
        { name: 'timecreate', type: 'date' , dateFormat: 'c'},
        { name: 'lastuserupdateid_link', type: 'number' },
        { name: 'lasttimeupdate', type: 'date' , dateFormat: 'c'},
        {
            name: 'stockinProductType',
            type: 'string',
            convert: function (value, rec) {
                var stockintypeid_link = rec.get('stockintypeid_link');
                if(stockintypeid_link >= 1 && stockintypeid_link <= 10){
                    return 'Nguyên liệu';
                }
                if(stockintypeid_link >= 11 && stockintypeid_link <= 20){
                    return 'Phụ liệu';
                }
                if(stockintypeid_link >= 21 && stockintypeid_link <= 30){
                    return 'Thành phẩm';
                }
                return 'Khác';
            }
		},
    ],
    hasMany : {model: 'Stockin_d', name: 'stockin_d'},
    hasMany : {model: 'Stockin_product', name: 'stockin_product'}
});