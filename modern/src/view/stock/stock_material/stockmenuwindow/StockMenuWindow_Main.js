Ext.define('GSmartApp.view.stock.stock_material.stockmenuwindow.StockMenuWindow_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'StockMenuWindow_Main',
    itemId: 'StockMenuWindow_Main',
    reference: 'StockMenuWindow_Main',
    controller: 'StockMenuWindow_MainController',
    viewModel: {
        type: 'StockMenuWindow_ViewModel',
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            margin: 1,
            flex: 1,
            xtype: 'StockMenuWindow',
        },
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-random',
                    itemId:'btnChon',
                    text: 'Chọn',
                    ui: 'action',
                    margin: 1,
                },    
            ]
        },
    ]
});