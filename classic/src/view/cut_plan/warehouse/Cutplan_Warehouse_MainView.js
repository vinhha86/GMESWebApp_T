Ext.define('GSmartApp.view.warehouse.cut_plan.Cutplan_Warehouse_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Cutplan_Warehouse_MainView',
    id: 'Cutplan_Warehouse_MainView',
    layout: 'border',
    controller: 'Cutplan_Warehouse_MainView_Controller',
    // viewModel: {
    //     type: 'Cutplan_WareHouse_ViewModel'
    // },
    items: [
        {
            region: 'west',
            xtype: 'Cutplan_WareHouse_View',
            border: true,
            margin: 1,
            bind: {
                width: '{width_npl}'
            }
        },
        {
            region: 'center',
            xtype: 'Stockout_order_warehouse_View',//'GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_warehouse_View',
            border: true,
            margin: 1
        },
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                    + '<div class="color-square process-free"></div>&nbspĐã tở vải'
                    + '</div>',
                margin: 5
            }, {
                html: '<div class="color-box">'
                    + '<div class="color-square process-granted"></div>&nbspChưa tở vải'
                    + '</div>',
                margin: 5
            }]
        }]
    }]
})