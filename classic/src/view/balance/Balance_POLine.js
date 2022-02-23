Ext.define('GSmartApp.view.balance.Balance_POLine', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_POLine',
	id: 'Balance_POLine',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        // getRowClass: function(record, index) {
        //     var c = record.get('status');
        //     if (c == -1) {
        //         return 'epc-error';
        //     }
        //     else {
        //         return 'epc-ok';
        //     }
        // }                     
    },
	bind:{
		store: '{Balance_POLine}'
	},
	columns: [
		{
			text: 'PO Buyer', 
			flex: 1,
			dataIndex: 'color_name'
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage',
			width: 80
		},
	]
});

