Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_Main_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockout_Pcontract_Main_View',
    id: 'Stockout_Pcontract_Main_View',
    // controller: 'Stockin_packinglist_Controller',
    viewModel:{
        type:'Stockout_Pcontract_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'Stockout_Pcontract_View',
                    // width: '40%',
                    flex: 1,
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'Stockout_Pcontract_MaterialList_View',
                    margin: 1
                }
            ]
        }, 
    ],
    // dockedItems: [
    //     {
    //         dock: 'bottom',
    //         layout: 'hbox',
    //         border: false,
    //         items: [
    //             {
    //                 margin: 3,
    //                 xtype:'button',
    //                 text:  'Thoát',
    //                 iconCls: 'x-fa fa-window-close',
    //                 itemId: 'btnThoat'
    //             },
    //             {
    //                 xtype:'button',
    //                 text: 'Thêm NPL',
    //                 margin: 3,
    //                 itemId:'btnSelect',
    //                 iconCls: 'x-fa fa-plus'
    //             },
    //         ]
    //     }
    // ],
});
