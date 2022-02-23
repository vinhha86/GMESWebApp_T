Ext.define('GSmartApp.model.pcontract.PContractProductTreeModel', {
	extend: 'Ext.data.TreeModel',
	fields: [
		{ name: 'id' },
		{ name: 'parent_id', type: 'int' },
		{ name: 'text', type: 'string' },
		{ name: 'code', type: 'string' },
		{ name: 'imgproduct' },
		{ name: 'amount', type: 'int' },
		{ name: 'amount_stockout', type: 'int' },//So luong da xuat kho cho don hang
		{ name: 'price', type: 'number' },
		{
			name: 'totalprice', type: 'number',
			calculate: function (data) {
				return data.amount * data.price;
			}
		}
	],
});