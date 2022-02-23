Ext.define('GSmartApp.view.pcontract.PContract_POrder_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_Main',
    id: 'PContract_POrder_Main',
    itemId: 'PContract_POrder_Main',
    controller: 'PContract_POrderController',

    layout: 'border',
    items: [
        {
            region: 'west',
            border: true,
            xtype: 'PContract_POList',
            padding: 1,
            width: '45%',                   
        },
        {
            region: 'center',
            border: true,
            // title: 'Yêu cầu sản xuất',
            xtype: 'PContract_POrder_Req',
            padding: 1,
            // width: '25%',       
        },
        {
            region: 'east',
            border: true,
            // title: 'Lệnh sản xuất',
            xtype: 'PContract_POrder_Detail',
            padding: 1,
            width: '37%',       
        }
    ]
})