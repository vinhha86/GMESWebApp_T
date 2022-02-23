Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detail.Stockout_order_pkl_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_order_pkl_MainView',
    id: 'Stockout_order_pkl_MainView',
    layout: 'border',
    controller: 'Stockout_order_pkl_MainView_Controller',
    viewModel: {
        type: 'Stockout_order_pkl_MainViewModel'
    },
    items: [
        {
            region: 'west',
            xtype: 'Stockout_order_pkl_View',
            border: true,
            margin: 1,
            bind: {
                width: '{width_npl}'
            }
        },
        {
            region: 'center',
            xtype: 'Stockout_order_warehouse_View',
            border: true,
            margin: 1
        },
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
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