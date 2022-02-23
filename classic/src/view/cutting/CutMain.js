Ext.define('GSmartApp.view.cutting.CutMain', {
    extend: 'Ext.container.Container',
    xtype: 'cutmain',
    controller: 'cut',
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'cuttinglist',
            id: 'panel_cuttinglist',
            margin: 1,
            region: 'center'
        },
        {
            xtype: 'cutorderwaiting',
            id: 'panel_cutwaiting',
            width: 260,
            region: 'east',
            hidden: true  
        }
    ],
    listeners: {
        activate: 'onActivate'
    }      
});
