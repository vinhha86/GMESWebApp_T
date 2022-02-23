Ext.define('GSmartApp.view.stock.stock_material.StockMaterialListViewModel', {
    extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.StockMaterialListViewModel',
    requires: [
        'GSmartApp.store.warehouse.WarehouseStore'
    ],
	stores:{
		WarehouseStore:{
			type :'WarehouseStore'
		},
	},
	data: {
		record: null,

		maHangFilter: null,
        donHangFilter: null,
        maSPFilter: null,

		objStock: {
			row: null,
			space: null,
			floor: null
		}
	},
})