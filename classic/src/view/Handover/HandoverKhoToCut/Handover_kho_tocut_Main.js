Ext.define('GSmartApp.view.handover.Handover_kho_tocut_Main', {
    extend: 'Ext.container.Container',
    xtype: 'handover_kho_tocut',
    controller: 'Handover_kho_tocut_Controller',
    viewModel: {
        type: 'Handover_kho_tocut_EditModel'
    },
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'Handover_kho_tocut_List',
            margin: 1,
            region: 'center'
        }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
