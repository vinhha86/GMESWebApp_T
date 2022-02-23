Ext.define('GSmartApp.model.pcontract.PContractPO_Price', {
    extend: 'Ext.data.Model',
	fields: [
		'idx',
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'pcontractid_link',   type: 'int'},
		{name: 'pcontract_poid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'sizesetid_link',   type: 'int'},
		{name: 'sortvalue',   type: 'int'},
		{name: 'price_cmp',   type: 'number'},
		{name: 'price_fob',   type: 'number'},
		{name: 'sewfobratio',   type: 'number'},
		{name: 'price_sewingtarget',   type: 'int'},
		{name: 'price_sewingcost',   type: 'int'},
		{name: 'totalprice',   type: 'number'},
		{name: 'salaryfund',   type: 'number'},	
		{name: 'quantity',   type: 'int'},	
		'sizesetname'
	],
	hasMany : {model: 'PContractPO_Price_D', name: 'pcontract_price_d'}
});