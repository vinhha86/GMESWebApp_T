Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Stockout_order_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_order_MainView',
    id: 'Stockout_order_MainView',
    controller: 'Stockout_order_MainViewController',
    layout: 'border',
    items: [{
        region: 'south',
        xtype: 'Stockout_order_list_DetailView',
        margin: 1,
        border: true,
        height: '40%'
    }, {
        region: 'center',
        xtype: 'Stockout_order_list_View',
        border: true,
        margin: 1
    }]
});

