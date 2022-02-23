Ext.define('GSmartApp.store.pcontract.PContract_PO_Price_D_SKU_Store', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Price_D_SKU_Store',
	storeId: 'PContract_PO_Price_D_SKU_Store',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Price_D_SKU',
	// sorters: [{
    //     direction: 'ASC',
    //     property: 'fobpriceid_link'
	// }]
});
