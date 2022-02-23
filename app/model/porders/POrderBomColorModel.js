Ext.define('GSmartApp.model.porders.POrderBomColorModel', {
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
        'unitName',
        'materialCode'
    ]
});