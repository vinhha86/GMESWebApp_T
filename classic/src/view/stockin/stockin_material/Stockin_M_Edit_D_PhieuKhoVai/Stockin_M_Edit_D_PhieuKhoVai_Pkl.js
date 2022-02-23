Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit_d_phieukhovai.Stockin_M_Edit_D_PhieuKhoVai_Pkl', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_Edit_D_PhieuKhoVai_Pkl',
	itemId: 'Stockin_M_Edit_D_PhieuKhoVai_Pkl',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_M_Edit_D_PhieuKhoVai_PklController',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	// plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onPackingListItemEdit',
    //             // beforeedit: 'onPriceDItemBeforeEdit'
    //         }             
    //     }
    // },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{StockinPklStore}'
	},
	columns: [
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
			flex: 1,
            // summaryType: 'count',
			// summaryRenderer: 'renderCount'
		},
		{
			text: 'Cây số', 
			dataIndex: 'packageid',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount',
		},
		{
			text: 'Dài (M)', 
			dataIndex: 'met_check',
            flex: 1,
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
		},
		{
			text: 'Dài (Y)', 
			dataIndex: 'ydscheck',
            flex: 1,
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
		},
	],
	// dockedItems: [{
	// 	dock: 'top',
    //     xtype: 'toolbar',
	// 	items: [
            
	//     ]
	// }]
});

