Ext.define('GSmartApp.view.stockin.stockin_material.PContract_Product_Select_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_Product_Select_ViewModel',
    requires: [
        'GSmartApp.store.pcontract.PContractProductStore'
    ],
    stores: {
        PContractProductStore: {
            type: 'PContractProductStore'
        },
    },
    data:{
        stockin: null,
        pcontractid_link: null,
        ProductCodeFilterValue: null,
    }
})