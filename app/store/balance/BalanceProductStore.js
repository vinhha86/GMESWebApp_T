Ext.define('GSmartApp.store.BalanceProductStore', {
	extend: 'Ext.data.Store',
	storeId: 'BalanceProductStore',
	alias: 'store.BalanceProductStore',
	idProperty: 'idx',
    fields: [
		'idx',
		{name: 'productid_link', type: 'int'},
		{name: 'product_code',   type: 'string'},
		{name: 'product_name',   type: 'string'},
		{name: 'colorid_link',   type: 'int'},
		{name: 'color_name',   type: 'string'},
		{name: 'amount',   type: 'int'}
	],
	sorters: [{
        property: 'mat_sku_code',
        direction: 'ASC'
	}],
});
