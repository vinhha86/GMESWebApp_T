Ext.define('GSmartApp.view.stock.stockmenuwindow.StockMenuWindow', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'StockMenuWindow',
    itemId: 'StockMenuWindow',
    controller: 'StockMenuWindow_Controller',

    requires: [
        'Ext.Dialog'
    ],

    title: 'Phân xưởng',
    emptyText: 'Không có dữ liệu',
    displayField: 'nameMobile',
    useTitleAsBackText: false,
    backText: '',
    backButton: {
        iconCls: 'x-fa fa-arrow-left',
    },

    bind:{
        store:'{StockTreeStore}'
    },

    listeners: {
        // leafchildtap: 'onLeafChildTap',
        // itemtap : 'onItemTap'
    }
});