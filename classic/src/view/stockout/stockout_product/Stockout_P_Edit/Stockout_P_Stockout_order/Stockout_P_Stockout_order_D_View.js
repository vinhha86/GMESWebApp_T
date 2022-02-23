Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_D_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_Stockout_order_D_View',
    itemId: 'Stockout_P_Stockout_order_D_View',
    reference: 'Stockout_P_Stockout_order_D_View',
    controller: 'Stockout_P_Stockout_order_D_ViewController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false       
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
		ftype: 'summary',
		dock: 'top'
	}],
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
        store: '{stockout_order.stockout_order_d}'
    },
    columns:[
        {
			text: 'SKU', 
			flex: 1,
			// width: 120,	
			dataIndex: 'skucode_p'
		},
		{
			text: 'Màu', 
			dataIndex: 'color_name_p',
			flex: 1
		},
		{
			text: 'Cỡ', 
			dataIndex: 'size_name_p',
			flex: 1
			// width: 70
		},
        {
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL tồn', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			dataIndex: 'totalSLTon'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL xuất', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderCount',
			dataIndex: 'totalpackage'
		},
    ],
});

