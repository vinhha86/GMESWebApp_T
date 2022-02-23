Ext.define('GSmartApp.model.pcontract.PcontractPairModel', {
    extend: 'Ext.data.Model',	
	idProperty: 'idx',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'idx', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'productName',   type: 'string'},
		{name: 'productCode',   type: 'string'},
		{name: 'productpairName',   type: 'string'},
		{name: 'productpairCode',   type: 'string'},
		{name: 'pquantity',   type: 'int'},
		{name: 'amount',   type: 'int'},
		{name: 'imgproduct'}
    ],
});