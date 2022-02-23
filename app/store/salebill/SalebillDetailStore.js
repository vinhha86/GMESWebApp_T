Ext.define('GSmartApp.store.salebill.SalebillDetailStore', {
	extend: 'Ext.data.Store',
	alias: 'store.SalebillDetailStore',
	fields: [
		{ name: 'epc', type: 'string' },
		{ name: 'oldepc', type: 'string' },
		{ name: 'tid', type: 'string' },
		{ name: 'skuname', type: 'string' },
		{ name: 'skucode', type: 'string' },
		{ name: 'unitname', type: 'string' },
		{ name: 'amount', type: 'number' },
		{ name: 'unitprice', type: 'number' },
		{ name: 'discountpercent', type: 'number' },
		{ name: 'discount', type: 'number' },
		{ name: 'totalpackage', type: 'number' },
		{ name: 'totalamount', type: 'number' },
		{ name: 'vatpercent', type: 'number' },
		{ name: 'totalvat', type: 'number' },
		{ name: 'totalsum', type: 'number' },

	]

});
