Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_POrder_SizeColorPickup_ViewModel',
     stores:{
        PContractProduct_PO_Store:{
            type :'PContractProductStore'
        },
        PContractSKUStore:{
            type: 'PContractSKUStore'
        },        
        SizePickupStore:{
            type: 'SizeColorPickupStore'
        },
        ColorPickupStore:{
            type: 'SizeColorPickupStore'
        },
    },
    data: {
        po: null,
        porderreqid_link: null,
        productid_link: null,
        sku_all: false,
        totalselect: 0
    }
})