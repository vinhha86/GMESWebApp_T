Ext.define('GSmartApp.view.pcontract.PContractView_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractView_Main',
    reference: 'shit',
    layout: {
        type: 'border'
    },
    controller: 'PContractViewController',
    viewModel: {
        type: 'PContractViewModel'
    },
    items:[
        {
            xtype: 'PContractView',
            id: 'panel_contract',
            margin: 1,
            region: 'center'
        },
        // {
        //     xtype: 'PContract_PO_Factories',
        //     id: 'panel_factories',
        //     width: 350,
        //     region: 'east',
        //     hidden: true  
        // }    
    ]   
})