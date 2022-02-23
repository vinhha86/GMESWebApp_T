Ext.define('GSmartApp.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',
    id: 'GSmartApp-view-main',
    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View'
    ],

    controller: 'main',
    // platformConfig: {
    //     phone: {
    //         controller: 'phone-main'
    //     }
    // },

    layout: 'hbox',

    items: [
        {
            xtype: 'maintoolbar',
            id: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar shadow'
        },
        {
            xtype: 'container',
            userCls: 'main-nav-container',
            reference: 'navigation',
            scrollable: true,
            hidden: true,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false
                },
            ]
        },
        {
            xtype: 'navigationview',
            flex: 1,
            id: 'mainCardPanel',
            reference: 'mainCardPanel',
            userCls: 'main-container',
            navigationBar: false,
            layout: {
                type: 'card',
                animation: {
                    duration: 300,
                    easing: 'ease-out',
                    type: 'fade',
                    direction: 'left'
                }
            }
            // hidden: true,
        },
    ]
});
