Ext.define('GSmartApp.model.pcontract.PContractPO_Shipping_D', {
    extend: 'Ext.data.Model',
	fields: [
		'idx',
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'pcontract_po_shippingid_link',   type: 'int'},
		{name: 'skuid_link',   type: 'int'},
		{name: 'amount',   type: 'number'}
	],
});