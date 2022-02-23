Ext.define('GSmartApp.view.tvshow.TVSMainForStock', {
    extend: 'Ext.container.Container',
    xtype: 'tvsmainforstock',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    viewModel:{
        type:'tvsmainforstock'
    },
    controller: 'tvsmainforstock',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            
            items: [
                {
                    xtype: 'tvsorggauge',//'tvsorgstatus',
                    id: 'org_gaugelist',
                    margin: '0 0 0 0',
                    flex: 1,
                    //scrollable: 'y'
                    //userCls: 'big-60 small-100'
                }
                // ,{
                //     xtype: 'panel',
                //     width: 5
                // }
                ,{
                    xtype: 'tvsorderwaitinggrid',
                    margin: '8 8 8 8',
                    width: 280,
                    //scrollable: 'y'
                }
            ]
        }
    ],
    // listeners: {
    //     focusleave: 'onRemoved'
    // }      
});
