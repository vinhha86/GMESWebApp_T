Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_Info_Main_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.product.ProductStore',],
    stores: {
        porderReqStore: {
            type: 'POrder_Req'
        },
        PackingTypeStore: {
            type: 'PackingTypeStore'
        },
        POShippingStore: {
            type: 'PContract_PO_Shipping_Store'
        },
        PortStore: {
            type: 'portstore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        ProductStore: {
            type: 'ProductStore'
        },
        ShipModeStore: {
            type: 'ShipModeStore'
        },
        QCOrgStore: {
            type: 'orgstore'
        }
    },
    data: {
        id: null,
        parentpoid_link: null,
        po: null,
        isedit: false,
        productpairid_link: 0,
        isHidden_req: false,
        width_PContract_PO_Edit_Porder_Req: 270,
        ishidden_luu_linegiaohang: true,
        pcontractid_link: null
    }
})