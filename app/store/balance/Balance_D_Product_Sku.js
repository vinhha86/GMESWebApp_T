Ext.define('GSmartApp.store.Balance_D_Product_Sku', {
	extend: 'Ext.data.Store',
	storeId: 'Balance_D_Product_Sku',
	alias: 'store.Balance_D_Product_Sku',
	idProperty: 'idx',
	fields: [
		'idx',
		'p_skuid_link',
		'p_sku_code',
		'p_sku_name',
		'p_sku_desc',
		'p_sku_color',
		'p_sku_size',
		'p_amount',
		'p_amount_dh',
		'po_buyer'
	],
	sorters: [
		{
			property: 'p_sku_code',
			direction: 'ASC'
		},
		{
			property: 'p_sku_color',
			direction: 'ASC'
		},
		{
			property: 'p_sku_size',
			direction: 'ASC'
		}
	],
});
