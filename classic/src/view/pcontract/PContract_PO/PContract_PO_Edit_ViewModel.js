Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Edit_ViewModel',
    requires: ['GSmartApp.store.unit.UnitStore',
        'GSmartApp.store.pcontract.PContract_PO_Price_Store',
        'GSmartApp.store.product.ProductStore',
        'GSmartApp.store.POrderFilter', 'GSmartApp.store.org.ListOrgStore'],
    stores: {
        POrderStore: {
            type: 'POrderFilter'
        },
        porderReqStore: {
            type: 'POrder_Req'
        },
        CurrencyStore: {
            type: 'CurrencyStore'
        },
        PriceStore: {
            type: 'PContract_PO_Price_Store'
        },
        Price_DStore: {
            type: 'PContract_PO_Price_D_Store'
        },
        Price_DStore_Copy: {
            type: 'PContract_PO_Price_D_Store'
        },
        Price_D_SKUStore: {
            type: 'PContract_PO_Price_D_SKU_Store'
        },
        ProductStore: {
            type: 'ProductStore'
        },
        SizeSetStore: {
            type: 'SizeSetStore'
        },
        UnitStore: {
            type: 'UnitStore'
        },
        EndBuyer: {
            type: 'ListOrgStore'
        },
        Vender: {
            type: 'ListOrgStore'
        },
        PackingTypeStore: {
            type: 'PackingTypeStore'
        },
        QCOrgStore: {
            type: 'orgstore'
        },
        ShipModeStore: {
            type: 'ShipModeStore'
        }
    },
    data: {
        id: null,
        po_typeid_link: 0,
        parentId: 0,
        po_price: null,
        po_price_copy: null,
        packing_arr: null,
        product_selected_id_link: null,
        product_selected_typeid_link: null,
        isproductpair: 0,
        productpairid_link: 0,
        pcontractid_link: 0,
        org_droppedid: null,
        org_droppedname: null,
        org_droppedcode: null,
        isSewPriceReadonly: true,
        isSewCostPriceReadonly: true,
        po: {
            isauto_calculate: true,
            id: null
        },
        schedule: {
            startDate: new Date((new Date()).getFullYear(), (new Date()).getMonth() - 1, 1),
            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1),
            listid: '13,14',
            PO: '',
            buyer: 0,
            vendor: 0,
            isReqPorder: true,
            isAllgrant: true
        },
        ishidden_tbd: false,
        isHidden_PO: false,
        isHidden_CMP: false,
        isHidden_Salary: false,
        isHidden_GrantOrg: true,
        isHidden_GuessView: true,
        isHidden_PDF: true,
        isHidden_KHGH: false,
        isHidden_Phanlenh: true,
        isHidden_GuestView: true,
        isPO_BuyerDisable: false,
        isPO_VendorDisable: false,
        isSizeset_CheckOK: false,
        isPorderReq_CheckOK: false,
        porder_req: {
            sum_set: 0
        },
        hidden_btnThemOrg: true,
        pcontract_po_productivity: {

        },

        // copy paste po info o sua chao gia
        obj_copy: null,
        obj_paste_btn_hidden: true,
        obj_copy_btn_hidden: true,

        // dung cho view price_d_sku
        price_d_record: null,
        price_d_sku_record: null,

        //nut luu khi them moi 
        hiddenBtnLuuAdd: true
    }
})