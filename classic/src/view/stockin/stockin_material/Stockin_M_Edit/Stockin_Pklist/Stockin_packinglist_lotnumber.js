Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_lotnumber', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_lotnumber',
	id: 'Stockin_packinglist_lotnumber',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_packinglist_lotnumber_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{LotStore}'
	},
	columns: [
		{
			text: 'Số Lot', 
			dataIndex: 'lot_number',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},
	],
});

