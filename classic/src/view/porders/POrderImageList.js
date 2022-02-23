Ext.define('GSmartApp.view.porders.POrderImageList', {
    extend: 'Ext.view.View',
    xtype: 'porderimagelist',
    scrollable: true,
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated',
        'GSmartApp.store.TVSOrgStatus'
    ],
    reference: 'porderimagelist',
    cls:'list',
    plugins: {
        'ux-animated-dataview': true
    },

    itemSelector: 'div.porderimage',
    itemTpl: [
            '<div class="porderimage">',
                '<img height="200" width="180" src="{image_uri}" />',
            '</div>',
    ],

    store: {
        type: 'porderimage'
    },
    listeners: {
        itemclick: 'onImageItemClick'
    }    
});   

