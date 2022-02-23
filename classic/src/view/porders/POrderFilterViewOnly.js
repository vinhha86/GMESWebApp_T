Ext.define('GSmartApp.view.porders.POrderFilterViewOnly', {
    extend: 'Ext.container.Container',
    xtype: 'porderfilterviewonly',
    requires: [
        'Ext.layout.container.Border'
    ],    
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'porderbysalerequest',
            margin: 1,
            region: 'center'
        }
    ]
    // listeners: {
    //     activate: 'onActivate'
    // }      
});
