Ext.define('GSmartApp.store.pcontract.PContract_PO_Shipping_DStore', {
    extend: 'Ext.data.Store',
	alias: 'store.PContract_PO_Shipping_DStore',
	storeId: 'PContract_PO_Shipping_DStore',
	idProperty: 'idx',
	model: 'GSmartApp.model.pcontract.PContractPO_Shipping_D',
	sorters: [{
        direction: 'ASC',
        property: 'mauSanPham'
	},{
        direction: 'ASC',
        property: 'coSanPham'
	}],
});
