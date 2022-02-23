Ext.define('GSmartApp.view.pcontract.PContractList_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractList_Main',
    reference: 'PContractList_Main',
    layout: {
        type: 'border'
    },
    // controller: 'PContractViewController',
    viewModel: {
        type: 'PContractList_Main_ViewModel'
    },
    items:[
        {
            region: 'north',
            height: '60%',
            xtype: 'PContractMainView',
            border: true,
            margin: 1
        },
        {
            region: 'center',
            xtype: 'PContractListPOView',
            // title: 'Danh sách PO',
            border: true,
            margin: 1
        }    
    ]   
})