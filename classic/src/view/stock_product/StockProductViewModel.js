Ext.define('GSmartApp.view.stock_product.StockProductViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockProductViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockProductTreeStore',
    ],
    stores: {
        StockProductTreeStore: {
            type: 'StockProductTreeStore'
        },
        // ListPhanXuongStore: {
        //     type: 'ListOrgStore'
        // },
        ListKhoRowStore: {
            type: 'ListOrgStore'
        },
        ListKhoSpaceStore: {
            type: 'ListOrgStore'
        },
        WarehouseStore: {
            type: 'WarehouseStore'
        },
		Sku_AutoComplete: {
			type :'Sku_AutoComplete'
		},
    },
    data: {
        record: null,
        isEdit: false,

        searchObj: {
            maHang: null,
            maHangId: null,
            donHang: null
        },

        rowObj: {
            orgid_link: null,
            code: null,
        },
        
        spaceObj: {
            orgid_link: null,
            spaceepc: null,
            spaceepc_old: null,
            spacename: null,
            spacename_old: null,
            floorid: null,
            floorid_old: null,
            rowid_link: null,
            isCreateNew: false,
        },

        isTxtFieldSpaceNameDisable: false,
    },
    formulas: {

    }
})