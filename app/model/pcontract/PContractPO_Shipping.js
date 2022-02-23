Ext.define('GSmartApp.model.pcontract.PContractPO_Shipping', {
    extend: 'Ext.data.Model',
	fields: [
		'idx',
		{name: 'orgrootid_link',   type: 'int'},
		{name: 'id',   type: 'int'},
		{name: 'pcontract_poid_link',   type: 'int'},
		{name: 'productid_link',   type: 'int'},
		{name: 'code',   type: 'string'},
		{name: 'shipdate',   type: 'date', dateFormat: 'c'},
		{name: 'shipamount',   type: 'number'},
		{name: 'shipnotice',   type: 'string'},
		{name: 'portfromid_link',   type: 'int'},
		{name: 'porttoid_link',   type: 'int'},
		{name: 'packingnotice',   type: 'string'},
		{name: 'usercreatedid_link',   type: 'int'},
		{name: 'timecreate',   type: 'date', dateFormat: 'c'},
	],
	hasMany : {model: 'PContractPO_Shipping_D', name: 'shipping_d'}
});