Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit.POrder_Grant_Plan_StockoutOrder_Edit_Date', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_Date',
    itemId: 'POrder_Grant_Plan_StockoutOrder_Edit_Date',
    reference: 'POrder_Grant_Plan_StockoutOrder_Edit_Date',
    cls: 'POrder_Grant_Plan_StockoutOrder_Edit_Date',
    controller: 'POrder_Grant_Plan_StockoutOrder_Edit_DateController',
    // viewModel:{
    //     type:'POrder_Grant_Plan_Date_ViewModel'
    // },
    // requires: [
	// 	'Ext.grid.plugin.CellEditing',
	// 	'Ext.grid.plugin.Exporter',
	// ],
    // plugins: [
    //     {
    //         ptype: 'gridexporter',
    //         // gridexporter: true
    //     },
    // ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
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
    //         groupHeaderTpl: '<b>{name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{DateStore}'
    },
    columns:[
        { 
            xtype: 'datecolumn',
            format: 'd/m/Y',
            header: 'Ngày', 
            dataIndex: 'date', 
            flex: 1,
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
                xtype:'button',
                text: 'Tính SL vải yêu cầu',
                margin: 3,
                itemId:'btnSelect',
                iconCls: 'x-fa fa-refresh'
            },
            {
                flex:1,
                border: false
            },
        ]
    }]
});

