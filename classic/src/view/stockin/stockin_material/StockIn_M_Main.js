Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Stockin_M_Main',
    itemId:'Stockin_M_Main',
    controller: 'Stockin_M_Main_Controller',
    items: [
        {
            title: 'Phiếu nhập kho',
            xtype: 'Stockin_M_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Yêu cầu nhập kho',
            xtype: 'Stockin_Order_List_Main',
            margin: 1,
        }, 
    ], 
})