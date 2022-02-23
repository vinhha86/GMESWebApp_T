Ext.define('GSmartApp.model.pcontract.PContractBOMColorModel', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
        { name: 'id', type: 'int' },
        { name: 'colorid_link', type: 'int' },
        { name: 'productid_link', type: 'int' },
        { name: 'materialid_link', type: 'int' },
        { name: 'materialName', type: 'string' },
        { name: 'unitid_link', type: 'int' },
        { name: 'amount' },
        { name: 'amount_color' },
        { name: 'lost_ratio' },
        { name: 'description', type: 'string' },
        { name: 'createduserid_link', type: 'int' },
        { name: 'createduserName', type: 'string' },
        { name: 'createddate', type: 'date' },
        { name: 'orgrootid_link', type: 'int' },
        { name: 'pcontractid_link', type: 'int' },
        { name: 'materialName', type: 'string' },
        { name: 'tenMauNPL', type: 'string' },
        { name: 'coKho', type: 'string' },
        { name: 'productType', type: 'int' },
        { name: 'product_typename', type: 'string' },
        'unitName',
        'materialCode',
        'forothercontract_name',
        {
            name: 'forothercontract',
            calculate: function (data) {
                return data.forothercontract_name == 'true' ? true : false;
            }
        },
        'color_name'
    ]
});