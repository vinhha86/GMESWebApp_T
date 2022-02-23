Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Schedule_plan_ViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.POrderFilter',
        'GSmartApp.store.POrder_Req', 'GSmartApp.store.POrder_Grant',
        'GSmartApp.store.PContractPO_Product_Store', 'GSmartApp.store.pcontract.PContractPOStore',
        'GSmartApp.store.product.ProductStore', 'GSmartApp.store.attribute.attributeValueStore',
        'GSmartApp.store.sizeset.SizesetStore'],
    data: {
        schedule: {
            // startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
            startDate: Ext.Date.add(new Date(), Ext.Date.DAY, -30),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1),
            listid: '13,14',
            PO: '',
            product_buyercode: '',
            contractcode: '',
            buyer: 0,
            vendor: 0,
            isReqPorder: true,
            isAllgrant: true
        },
        isHidden_KHGH: true,
        isHidden_CMP: true,
        isHidden_Salary: true,
        isHidden_Phanlenh: false,
        isHidden_GuestView: false,
        is_pair: false,
        productid_link: 0
    },
    stores: {
        POLineStore: {
            type: 'PContractPOStore'
        },
        EndBuyer: {
            type: 'ListOrgStore'
        },
        Vender: {
            type: 'ListOrgStore'
        },
        POrderUnGranted: {
            type: 'PContractPO_Product_Store'
        },
        Porder_Req_Store: {
            type: 'POrder_Req'
        },
        Porder_Req_Granted_Store: {
            type: 'POrder_Req'
        },
        POrder_Change_Store: {
            type: 'POrder_Grant'
        },
        PContractrPoductPOStore: {
            type: 'PContractPO_Product_Store'
        },
        ProductStore: {
            type: 'ProductStore'
        },
        MauSanPhamStore: {
            type: 'attributeValueStore'
        },
        DaiCoSanPhamStore: {
            type: 'SizesetStore'
        }
    }
})