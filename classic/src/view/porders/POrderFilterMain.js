Ext.define('GSmartApp.view.porders.POrderFilterMain', {
    extend: 'Ext.container.Container',
    xtype: 'porderfiltermain',
    requires: [
        'Ext.layout.container.Border'
    ],    
    controller: 'porderfilter',
    viewModel: 'porderfilter',
    layout: {
        type: 'border'
    },
    
    items: [
        {
            xtype: 'porderfilter',
            margin: 1,
            region: 'center'
            //scrollable: 'y'
            //userCls: 'big-60 small-100'
        },
        // {
        //     xtype: 'panel',
        //     width: 5
        // },
        {
            xtype: 'POrderFilterOrgList',
            id: 'panel_tosx',
            width: 250,
            region: 'east',
            hidden: true  
        }
    ]
    // listeners: {
    //     activate: 'onActivate'
    // }      
});
