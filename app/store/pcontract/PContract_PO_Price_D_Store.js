Ext.define('GSmartApp.store.pcontract.PContract_PO_Price_D_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Price_D_Store',
	storeId: 'PContract_PO_Price_D_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Price_D',
	sorters: [{
        direction: 'ASC',
        property: 'fobpriceid_link'
	}]
});
