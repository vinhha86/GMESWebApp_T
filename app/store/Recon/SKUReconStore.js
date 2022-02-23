Ext.define('GSmartApp.store.SKUReconStore', {
	extend: 'Ext.data.Store',
	storeId: 'SKUReconStore',
	alias: 'store.SKUReconStore',
	idProperty: 'idx',
	fields: [
		'idx',
		{ name: 'mat_skuid_link', type: 'int' },
		{ name: 'mat_sku_code', type: 'string' },
		{ name: 'mat_sku_name', type: 'string' },
		{ name: 'mat_sku_color_id', type: 'int' },
		{ name: 'mat_sku_color_name', type: 'string' },
		{ name: 'mat_sku_size_name', type: 'string' },
		{ name: 'mat_sku_unit_name', type: 'string' },
		{ name: 'mat_sku_product_typename', type: 'string' },
		{ name: 'mat_sku_bom_amount', type: 'number' },
		{ name: 'mat_sku_bom_lostratio', type: 'number' },
		{ name: 'mat_sku_demand', type: 'number' },
		{ name: 'mat_sku_invoice', type: 'number' },
		{ name: 'mat_sku_invoice_date', type: 'date' },
		{ name: 'mat_sku_stockin', type: 'number' },
		{ name: 'mat_sku_stockout', type: 'number' },
		{ name: 'mat_sku_dif', type: 'number' },
		{
			name: 'in_stock',
			calculate: function (data) {
				return (data.mat_sku_stockin - data.mat_sku_stockout);
			}
		},
		{
			name: 'ability',
			calculate: function (data) {
				return (data.mat_sku_stockin - data.mat_sku_stockout) / data.mat_sku_bom_amount;
			}
		},
		{ name: 'mat_sku_byproduct_stockin', type: 'number' },
		{ name: 'mat_sku_byproduct_stockout', type: 'number' },
	],
	groupField: 'mat_sku_product_typename',
	sorters: [{
		property: 'mat_sku_code',
		direction: 'ASC'
	}],
});
