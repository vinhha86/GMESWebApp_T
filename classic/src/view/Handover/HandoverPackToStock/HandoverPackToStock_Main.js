Ext.define('GSmartApp.view.handover.HandoverPackToStock_Main', {
    extend: 'Ext.container.Container',
    xtype: 'handover_pack_tostock',
    id:'HandoverPackToStock_Main',
    controller: 'HandoverPackToStock_List_Controller',
    viewModel: {
        type: 'HandoverPackToStock_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'HandoverPackToStock_List'
    }],
    listeners: {
        activate: 'onActivate'
    }        
})