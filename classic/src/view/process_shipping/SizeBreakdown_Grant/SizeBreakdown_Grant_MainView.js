Ext.define('GSmartApp.view.process_shipping.SizeBreakdown_Grant.SizeBreakdown_Grant_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'SizeBreakdown_Grant_MainView',
    id: 'SizeBreakdown_Grant_MainView',
    itemId: 'SizeBreakdown_Grant_MainView',
    controller: 'SizeBreakdown_Grant_MainViewController',
    layout: 'border',
    items: [
        {
            region: 'west',
            width: '50%',
            margin: 1,
            border: true,
            xtype: 'POrder_List_GrantView'
        },
        {
            region: 'center',
            xtype: 'POrder_List_GrantSKUView',
            margin: 1,
            border: true
        }
    ],
})