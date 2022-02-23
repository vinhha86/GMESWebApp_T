Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_PO_Shipping_Main_ViewModel',
    stores: {
        Shipping_DStore: {
            type: 'PContract_PO_Shipping_DStore'
        },
        PortStore: {
            type: 'portstore'
        },
        PackingTypeStore:{
            type: 'PackingTypeStore'
        }     
    },
    data: {
        id: null,
        pcontract_poid_link: null,
        shipping: null 
    }
})