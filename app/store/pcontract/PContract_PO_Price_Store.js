Ext.define('GSmartApp.store.pcontract.PContract_PO_Price_Store', {
	extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Price_Store',
	storeId: 'PContract_PO_Price_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Price',
	sorters: [{
		direction: 'ASC',
		property: 'sizesetname'
	}]
});
