Ext.define('GSmartApp.model.stockin.Stockin_product', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
	fields: [
        {name: 'idx'},
		{name: 'id'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'stockinid_link',  type: 'int'},
		{name: 'productid_link',  type: 'int'},
		{name: 'product_code',  type: 'string'},
		{name: 'product_name',  type: 'string'},
		{name: 'product_desc',  type: 'string'},
	]
});
