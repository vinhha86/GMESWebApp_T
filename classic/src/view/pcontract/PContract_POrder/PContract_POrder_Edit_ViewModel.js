Ext.define('GSmartApp.view.pcontract.PContract_POrder_Edit_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_POrder_Edit_ViewModel',
     stores:{
        POSKUStore:{
            type: 'PContractSKUStore'
        },
        porderSKUStore:{
            type: 'porderSKUStore'
        },
    },
    data: {
        porder: null,
        isedit: true
    }
})