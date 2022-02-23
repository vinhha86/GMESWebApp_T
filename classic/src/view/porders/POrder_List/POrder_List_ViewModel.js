Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrder_List_ViewModel',
    requires: [
        'GSmartApp.store.porder.POrder_ListStatusStore',
        'GSmartApp.store.porder.POrder_ListVendorStore',
        'GSmartApp.store.porder.POrder_ListBuyerStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.org.ListOrgStore'
    ],
    stores: {
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        POrder_ListVendorStore: {
            type: 'ListOrgStore'
        },
        POrder_ListBuyerStore: {
            type: 'ListOrgStore'
        },
        POrder_ListStatusStore: {
            type: 'POrder_ListStatusStore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
    },
    data: {
        objSearch: {
            pobuyer: null,
            povendor: null,
            style: null,
            contractcode: null,
            buyerid: null,
            vendorid: null,
            factoryid: null,
            orderdatefrom: null,
            orderdateto: null,
            // golivedatefrom: new Date(new Date().getTime() - 30 * 86400000),
            // golivedateto: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1),
            golivedatefrom: null,
            golivedateto: null,
            status: [1, 2],
        }
    }
})