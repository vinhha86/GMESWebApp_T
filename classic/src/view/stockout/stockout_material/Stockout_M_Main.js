Ext.define('GSmartApp.view.stockout.Stockout_M_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Stockout_M_Main',
    itemId: 'Stockout_M_Main',
    controller: 'Stockout_M_Main_Controller',
    viewModel: {
        type: 'Stockout_M_EditModel'
    },
    // requires: [
    //     'Ext.layout.container.Border'
    // ],    
    // layout: {
    //     type: 'border'
    // },
    
    items: [
        {
            title: 'Phiếu xuất kho',
            xtype: 'Stockout_M_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu xuất kho',
            xtype: 'Stockout_Order_Main',
            margin: 1,
        }, 
    ],

});
