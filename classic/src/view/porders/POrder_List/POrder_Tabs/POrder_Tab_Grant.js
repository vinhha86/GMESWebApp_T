Ext.define('GSmartApp.view.porders.POrder_List.POrder_Tab_Grant', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrder_Tab_Grant',
    id: 'POrder_Tab_Grant',
    layout: 'border',
    items: [{
        region: 'west',
        width: '50%',
        border: false,
        xtype: 'POrder_List_GrantView',
        margin: 1
    }, {
        region: 'center',
        border: false,
        xtype: 'POrder_List_GrantSKUView',
        margin: 1
    }]
})