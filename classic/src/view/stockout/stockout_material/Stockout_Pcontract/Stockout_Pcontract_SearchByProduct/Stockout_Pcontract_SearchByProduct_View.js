Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_SearchByProduct_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pcontract_SearchByProduct_View',
    itemId: 'Stockout_Pcontract_SearchByProduct_View',
    reference: 'Stockout_Pcontract_SearchByProduct_View',
    controller: 'Stockout_Pcontract_SearchByProduct_Controller',
    viewModel:{
        type:'Stockout_Pcontract_SearchByProduct_ViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE'
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
        store:'{PContractStore}'
    },
    columns:[
        { 
            header: 'Mã đơn hàng', 
            dataIndex: 'contractcode', 
            flex: 1
        },
        { 
            header: 'Năm', 
            dataIndex: 'contractBuyerYear', 
            flex: 1
        },
        { 
            header: 'Buyer', 
            dataIndex: 'buyercode', 
            flex: 1
        },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            {
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            },
            {
                xtype:'button',
                text: 'Chọn đơn hàng',
                margin: 3,
                itemId:'btnSelect',
                iconCls: 'x-fa fa-plus'
            },
            // {
            //     flex:1,
            //     border: false
            // },
        ]
    }]
});

