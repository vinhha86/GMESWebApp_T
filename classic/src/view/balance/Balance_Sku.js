Ext.define('GSmartApp.view.balance.Balance_Sku', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_Sku',
	id: 'Balance_Sku',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	selModel: {
        selType: 'checkboxmodel',
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },
	bind:{
		store: '{BalanceProductStore}'
	},
	columns: [
		{
			text: 'SKU', 
			width: 100,
			dataIndex: 'product_code'
		},
		{
			text: 'Màu', 
			flex: 1,
			dataIndex: 'color_name'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'amount',
			width: 60
		},
	],
	// fbar: [
    //     '->',
    //     {
    //         minWidth: 80,
    //         text: 'Tính cân đối',
    //         iconCls: 'x-fa fa-calculator',
    //         handler: 'onCalBalance'
    //     }
    // ],     
});

