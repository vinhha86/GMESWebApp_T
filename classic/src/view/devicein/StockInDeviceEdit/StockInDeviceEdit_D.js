Ext.define('GSmartApp.view.devicein.StockInDeviceEdit_D', {
	extend: 'Ext.grid.Panel',
	xtype: 'StockInDeviceEdit_D',
	id: 'StockInDeviceEdit_D',
	requires: [
		// 'Ext.grid.plugin.CellEditing'
	],
	controller: 'StockInDeviceEdit_DController',
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
    },
	bind:{
		store: '{Devicein_D_Store}'
	},
	columns: [
		{
			text: 'Chủng loại tài sản', 
			dataIndex: 'deviceType',
			flex: 1
		},{
			text: 'Model', 
			dataIndex: 'deviceModel',
			flex: 1
		},{
			text: 'Số quản lý', 
			dataIndex: 'deviceCode',
			width: 170
		},{
			text: 'Số TSCĐ', 
			dataIndex: 'deviceFixassetno',
			width: 170
		},{
			text: 'Mã thiết bị (EPC)', 
			dataIndex: 'deviceEPCCode',
			flex: 1
		},
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockin_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
		// 	{
		// 		iconCls: 'x-fa fas fa-bars violetIcon',
		// 		tooltip:'Chi tiết chíp',
		// 		handler: 'onEPCDetail'
		// 	}
		// ]
		// }   	
	],
	// dockedItems: [{
	// 	dock: 'top',
	// 	xtype: 'toolbar',
	// 	items: [{
	// 		margin:'0 0 0 5',
	// 		xtype: 'button',
	// 		iconCls: 'x-fa fa-angle-double-up',
	// 		itemId: 'btnThuGon',
	// 		bind: {
	// 			hidden: '{IsformMaster}'
	// 		}
	// 	}, {
	// 		margin:'0 0 0 5',
	// 		xtype: 'button',
	// 		itemId: 'btnMoRong',
	// 		iconCls: 'x-fa fa-angle-double-down',
	// 		bind: {
	// 			hidden: '{!IsformMaster}'
	// 		}
	// 	}, {
	// 		labelWidth: 90,
	// 		margin:'0 5 5 5',
	// 		xtype: 'combobox',
	// 		reference: 'device',
	// 		fieldLabel: 'Thiết bị RFID',
	// 		bind: {
	// 			store: '{DeviceInvStore}'
	// 		},
	// 		width: 300,
	// 		displayField: 'name',
	// 		valueField: 'id',
	// 		listeners: {
	// 			change: 'onDeviceChange'
	// 		}
	// 	}, {
	// 		margin:'0 5 5 5',
	// 		text: "Start",
	// 		iconCls: 'x-fa fa-play',
	// 		xtype: 'button',
	// 		itemId: 'btnStart',
	// 		bind: {
	// 			disabled: '{isStart}',
	// 			userCls: '{clsbtnStart}'
	// 		}
	// 	}, {
	// 		margin:'0 5 5 5',
	// 		text: "Stop",
	// 		iconCls: 'x-fa fa-stop',
	// 		xtype: 'button',
	// 		itemId: 'btnStop',
	// 		userCls: 'red-button'
	// 	},
	// 	,'->',
	// 	{
	// 		xtype: 'textfield',
	// 		margin: '0 5 0 5',
	// 		itemId:'ordercode',
	// 		fieldLabel: 'Mã lệnh SX:',
	// 		width: 200,
	// 		labelWidth: 80,
	// 		hideLabel: false,			
    //         bind:{
	// 			disabled: '{isEdit}',
	// 			value: '{stockin.pordercode}'
    //         }
	// 		// fieldStyle: {
	// 		// 	textTransform: "uppercase"
	// 		// },
	// 		// enableKeyEvents: true,
	// 		// listeners: {
	// 		// 	// change: function (obj, newValue) {
	// 		// 	//     //console.log(newValue);
	// 		// 	//     obj.setRawValue(newValue.toUpperCase());
	// 		// 	// },
	// 		// 	keyup: 'onSkuCodeKeyup',
	// 		// 	buffer: 100
	// 		// }    
	// 	},
	// 	{
	// 		tooltip: 'Tải danh sách sản phẩm',
	// 		margin: '0 0 0 5',
	// 		//text: 'Thêm thẻ vải',
	// 		iconCls: 'x-fa fa-plus',
	// 		weight: 30,
	// 		itemId: 'btnTaiSP',			
    //         bind:{
    //             hidden: '{isEdit}'
    //         }
	// 		// handler: 'onAddItemTap'
	// 	},
	// 	{
	// 		tooltip: 'Tìm lệnh',
	// 		margin: '0 5 0 5',
	// 		itemId: 'btnTimLenh',
	// 		//text: 'Thêm thẻ vải',
	// 		iconCls: 'x-fa fa-search',
	// 		weight: 30,			
    //         bind:{
    //             hidden: '{isEdit}'
    //         }
	// 		// handler: 'onSkuSearchTap'
	// 	} 		
	// ]
	// }]
});
