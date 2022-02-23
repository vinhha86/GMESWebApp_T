Ext.define('GSmartApp.view.stock.StockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.StockViewModel',
    requires: [ 
        'GSmartApp.store.stock.StockTreeStore',
    ],
    stores: {
        StockTreeStore: {
            type: 'StockTreeStore'
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
    },
    data: {

        record: null,
        isEdit: false,

        searchObj: {
            maHang: null,
            maHangId: null,
            donHang: null,
            maSP: null,
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

        objStock: {
			row: null,
			space: null,
			floor: null
		},

        isTxtFieldSpaceNameDisable: false,
    },
    formulas: {

    }
})