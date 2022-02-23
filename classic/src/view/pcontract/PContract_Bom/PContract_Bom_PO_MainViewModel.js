Ext.define('GSmartApp.view.pcontract.PContract_Bom.PContract_Bom_PO_MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Bom_PO_MainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractPOStore',
        'GSmartApp.store.pcontract.PContractSKUStore',
        'GSmartApp.store.product.ProductStore'],
    stores: {
        PContractBom_PO_Store: {
            type: 'PContractPOStore'
        },
        PContractSKUStore: {
            type: 'PContractSKUStore'
        },
        PContractProduct_PO_Store: {
            type: 'ProductStore'
        }
    },
    data: {
        pcontractid_link: 0,
        productid_link: 0,
        material_skuid_link: 0,
        cmb_productid_link: 0,
        pcontract_poid_link: 0
    }
})