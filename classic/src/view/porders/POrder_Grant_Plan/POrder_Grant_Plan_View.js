Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_Plan_View',
    itemId: 'POrder_Grant_Plan_View',
	cls: 'POrder_Grant_Plan_View',
    reference: 'POrder_Grant_Plan_View',
    controller: 'POrder_Grant_Plan_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>NPL: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store: '{POrderGrant_SKU_PlanStore}'
    },
    columns: [
		{
			xtype: 'actioncolumn',
			width: 28,
			menuDisabled: true,
			sortable: false,
			align: 'center',
			items: [
				{
                    // text:  'Tạo lệnh cấp vải',
					tooltip: 'Tạo lệnh cấp vải',
					iconCls: 'x-fa fas fa-plus',
					handler: 'onTaoLenhCapVai'
				},
			]
		},
		{
			text: 'Khách hàng', 
			dataIndex: 'buyername',
			width: 150,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				var val = value == 'null' ? "" : value;
				metaData.tdAttr = 'data-qtip="' + val + '"';
				return val;
			},
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldMaNPL',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueMaNPLKeyup',
			// 		buffer: 500
			// 	}
			// }
		},
		{
			text: 'Mã SP(Buyer)', 
			dataIndex: 'productcode',
			width: 150,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
		{
			text: 'PO Lines',
			dataIndex: 'po_Lines',
			flex: 1,
            sortable: false,
            menuDisabled: true,
			renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			}
		},
	],
});