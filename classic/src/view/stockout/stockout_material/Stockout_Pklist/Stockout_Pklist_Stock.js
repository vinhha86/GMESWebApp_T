Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Stock', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pklist_Stock',
    itemId: 'Stockout_Pklist_Stock',
    reference: 'Stockout_Pklist_Stock',
    controller: 'Stockout_Pklist_StockController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>Đơn vị: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{StockStore}'
    },
    columns:[
        { 
            header: 'Khoang', 
            dataIndex: 'spaceString', 
            flex: 1
        },
    ],
    // dockedItems:[{
    //     layout:'hbox',
    //     border: false,
    //     dock:'bottom',
    //     items:[
    //         // {
    //         //     xtype:'button',
    //         //     text: 'Thoát',
    //         //     margin: 3,
    //         //     itemId:'btnThoat',
    //         //     iconCls: 'x-fa fa-window-close'
    //         // },
    //         {
    //             flex:1,
    //             border: false
    //         },
    //         {
    //             xtype:'button',
    //             text: 'Thêm NPL',
    //             margin: 3,
    //             itemId:'btnSelect',
    //             iconCls: 'x-fa fa-plus'
    //         },
    //     ]
    // }]
});

