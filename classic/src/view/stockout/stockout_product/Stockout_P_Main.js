Ext.define('GSmartApp.view.stockout.Stockout_P_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'stockout_p_main',
    id:'stockout_p_main',
    controller: 'Stockout_P_Main_Controller',
    viewModel: {
        type: 'Stockout_P_Model'
    },
    items: [
        {
            title: 'Phiếu xuất kho',
            xtype: 'Stockout_P_List_Main',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Lệnh xuất kho',
            xtype: 'Stockout_P_Order_Main',
            margin: 1,
        }, 
    ], 
})

// Ext.define('GSmartApp.view.stockout.Stockout_P_Main', {
//     extend: 'Ext.container.Container',
//     xtype: 'stockout_p_main',
//     controller: 'Stockout_P_Controller',
//     viewModel: {
//         type: 'Stockout_P_EditModel'
//     },
//     requires: [
//         'Ext.layout.container.Border'
//     ],    
//     layout: {
//         type: 'border'
//     },
    
//     items: [
//         {
//             xtype: 'stockout_p_list',
//             margin: 1,
//             region: 'center'
//         }
//     ],
//     listeners: {
//         activate: 'onActivate'
//     }      
// });

