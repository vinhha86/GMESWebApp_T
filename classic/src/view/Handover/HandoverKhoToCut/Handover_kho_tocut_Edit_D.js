Ext.define('GSmartApp.view.handover.Handover_kho_tocut_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Handover_kho_tocut_Edit_D',
    id: 'Handover_kho_tocut_Edit_D',
    requires: [
		'Ext.grid.plugin.CellEditing'
	],
    border: true,
    bind:{
        store: '{stockout.stockout_d}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        getRowClass: function(record, index) {
            var c = record.get('status');
            if (c == -1) {
                return 'epc-error';
            }
            else {
                return 'epc-ok';
            }
        }                     
    },
    columns: [

		{
			text: 'Mã NPL', 
			dataIndex: 'skucode',
			flex: 1
		},{
			text: 'Tên NPL', 
			dataIndex: 'skuname',
			flex: 1
		},{
			text: 'Màu', 
			dataIndex: 'color_name',
			flex: 1
		},{
			text: 'Cỡ', 
			dataIndex: 'size_name',
			flex: 1
		},{
			text: 'ĐVT', 
			dataIndex: 'unit_name',
			flex: 1
		},
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'N.W', 
		// 	align:'right',
		// 	dataIndex: 'netweight',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'G.W', 
		// 	align:'right',
		// 	dataIndex: 'grossweight',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000.00',
		// 	text: 'M3', 
		// 	align:'right',
		// 	dataIndex: 'm3',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 70
		// },
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'Y/C KT', 
		// 	align:'right',
		// 	dataIndex: 'totalpackage_order',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	width: 90
		// },
        // {
		// 	xtype: 'numbercolumn',
		// 	format:'0,000',
		// 	text: 'SL xuất', 
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	dataIndex: 'totalpackage',
		// 	width: 85
		// },
        {
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL xuất (m)', 
			align:'right',
			dataIndex: 'totalmet_origin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 90
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL nhận (m)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalmet_check',
			width: 85
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL xuất (y)', 
			align:'right',
			dataIndex: 'totalydsorigin',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			width: 90
		},
		{
			xtype: 'numbercolumn',
			format:'0,000.00',
			text: 'SL nhận (y)', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalydscheck',
			width: 85
		},
		{ 
			xtype: 'actioncolumn',
			reference: 'stockout_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
			// {
			// 	iconCls: 'x-fa fas fa-bars violetIcon',
			// 	tooltip:'Chi tiết chíp',
			// 	handler: 'onEPCDetail'
			// },
			{
				iconCls: 'x-fa fas fa-bars violetIcon',
				tooltip:'PackingList',
				handler: 'onViewPackingList'
			},
		]
        }   	
    ],
    // dockedItems: [{
    //     dock: 'top',
    //     xtype: 'toolbar',
    //     items: [
    //         {
    //             margin: '0 0 0 5',
    //             xtype: 'button',
    //             iconCls: 'x-fa fa-angle-double-up',
    //             itemId: 'btnThuGon',
    //             bind: {
    //                 hidden: '{IsformMaster}'
    //             }
    //         }, {
    //             margin: '0 0 0 5',
    //             xtype: 'button',
    //             itemId: 'btnMoRong',
    //             iconCls: 'x-fa fa-angle-double-down',
    //             bind: {
    //                 hidden: '{!IsformMaster}'
    //             }
    //         }, {
    //             labelWidth: 90,
    //             width: 300,
    //             margin: '0 0 0 5',
    //             xtype: 'combobox',
    //             fieldLabel: 'Thiết bị RFID:',
    //             bind: {
    //                 store: '{DeviceInvStore}'
    //             },
    //             displayField: 'name',
    //             valueField: 'id',
    //             name: 'deviceid',
    //             reference: 'device',
    //             listeners: {
    //                 change: 'onDeviceChange'
    //             }
    //         },
    //         {
    //             margin: '0 5 5 5',
    //             text: "Start",
    //             iconCls: 'x-fa fa-play',
    //             xtype: 'button',
    //             handler: 'onStart',
    //             bind: {
    //                 disabled: '{isStart}',
    //                 userCls: '{clsbtnStart}'
    //             }
    //         },
    //         {
    //             margin: '0 5 5 5',
    //             text: "Stop",
    //             iconCls: 'x-fa fa-stop',
    //             xtype: 'button',
    //             handler: 'onStop',
    //             userCls: 'red-button'
    //         }
    //     ]
    // }]
});
