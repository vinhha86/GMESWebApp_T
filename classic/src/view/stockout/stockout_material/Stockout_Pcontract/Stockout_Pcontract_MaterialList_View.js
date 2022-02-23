Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_MaterialList_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pcontract_MaterialList_View',
    itemId: 'Stockout_Pcontract_MaterialList_View',
    reference: 'Stockout_Pcontract_MaterialList_View',
    controller: 'Stockout_Pcontract_MaterialList_Controller',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
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
        store:'{StockoutD_Store}'
    },
    columns:[
        { 
            header: 'Mã NPL', 
            dataIndex: 'materialCode', 
            flex: 1
        },
        { 
            header: 'Tên NPL', 
            dataIndex: 'materialName', 
            flex: 1
        },
        { 
            header: 'Màu', 
            dataIndex: 'color_name', 
            flex: 1
        },
        { 
            header: 'Cỡ', 
            dataIndex: 'coKho', 
            flex: 1
        },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            // {
            //     xtype:'button',
            //     text: 'Thoát',
            //     margin: 3,
            //     itemId:'btnThoat',
            //     iconCls: 'x-fa fa-window-close'
            // },
            {
                flex:1,
                border: false
            },
            {
                xtype:'button',
                text: 'Thêm NPL',
                margin: 3,
                itemId:'btnSelect',
                iconCls: 'x-fa fa-plus'
            },
        ]
    }]
});

