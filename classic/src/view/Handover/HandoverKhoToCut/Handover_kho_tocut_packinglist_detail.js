Ext.define('GSmartApp.view.handover.Handover_kho_tocut_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'Handover_kho_tocut_packinglist_detail',
	id: 'Handover_kho_tocut_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Handover_kho_tocut_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPackingListItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},
	columns: [
        { 
            xtype: 'checkcolumn',
            // text: 'Đi làm',
            dataIndex: 'checked',
            headerCheckbox: false,
            width: 30,
            listeners: {
                // beforecheckchange: 'onBeforecheckchange',
                checkchange: 'onCheckchange',
                // headerclick: 'onHeaderClick'
            }
        },
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
			flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},
		{
			text: 'Cây số', 
			dataIndex: 'packageid',
            width: 50,
		},
		{
			text: 'Màu', 
			dataIndex: 'color_name',
            flex: 1,
		},
		// {
		// 	text: 'N.W', 
        //     dataIndex: 'netweight',
        //     flex: 1,
		// 	align:'right',
        //     summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	// editor:{
		// 	// 	xtype:'textfield',
		// 	// 	maskRe: /[0-9.]/,
		// 	// 	selectOnFocus: true
		// 	// },
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
        // },
        // {
		// 	text: 'G.W', 
        //     dataIndex: 'grossweight',
        //     flex: 1,
		// 	align:'right',
        //     summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	// editor:{
		// 	// 	xtype:'textfield',
		// 	// 	maskRe: /[0-9.]/,
		// 	// 	selectOnFocus: true
		// 	// },
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
        // },
        // {
		// 	text: 'M3', 
		// 	dataIndex: 'm3',
        //     flex: 1,
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/,
		// 		selectOnFocus: true
		// 	},
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
		// },
        {
			text: 'Khổ', 
			dataIndex: 'widthorigin',
            flex: 1,
			align:'right',
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},
        // {
		// 	text: 'Khổ thực tế', 
		// 	dataIndex: 'widthcheck',
        //     flex: 1,
		// 	align:'right',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/,
		// 		selectOnFocus: true
		// 	},
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
		// },
		{
			text: 'SL xuất (m)', 
            dataIndex: 'met_origin',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{
			text: 'SL nhận (m)', 
            dataIndex: 'met_check',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{
			text: 'SL xuất (y)', 
            dataIndex: 'ydsorigin',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			// editor:{
			// 	xtype:'textfield',
			// 	maskRe: /[0-9.]/,
			// 	selectOnFocus: true
			// },
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{
			text: 'SL nhận (y)', 
            dataIndex: 'ydscheck',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
        },
		{
			text: 'Ghi chú', 
            dataIndex: 'extrainfo',
            flex: 2,
			editor:{
				xtype:'textfield',
				selectOnFocus: true
			}
        },
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockout_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
		// 	{
		// 		iconCls: 'x-fa fas fa-trash',
		// 		tooltip: 'Xóa',
		// 		handler: 'onXoa'
		// 	}
		// ]
		// }   	
	],
	// dockedItems: [{
	// 	dock: 'top',
    //     xtype: 'toolbar',
	// 	items: [
    //         {
	// 		xtype: 'textfield',
	// 		margin: 1,
	// 		itemId:'packageid',
	// 		emptyText: 'Cây số',
	// 		width: 120,
	// 		labelWidth: 0,
	// 		hideLabel: true,
	// 		maskRe: /[0-9]/,		
    //         bind:{
	// 			value: '{packinglist.packageid}'
    //         }
	// 	},
	// 	{
	// 		xtype: 'textfield',
	// 		margin: 1,
	// 		itemId:'netweight',
	// 		emptyText: 'N.W',
	// 		flex: 1,
	// 		labelWidth: 0,
	// 		hideLabel: true,	
	// 		maskRe: /[0-9.]/,		
    //         bind:{
	// 			value: '{packinglist.netweight}'
    //         }
    //     },
    //     {
	// 		xtype: 'textfield',
	// 		margin: 1,
	// 		itemId:'grossweight',
	// 		emptyText: 'G.W',
	// 		flex: 1,
	// 		labelWidth: 0,
	// 		hideLabel: true,
	// 		maskRe: /[0-9.]/,
    //         bind:{
	// 			value: '{packinglist.grossweight}'
    //         }
	// 	},
	// 	// {
	// 	// 	xtype: 'textfield',
	// 	// 	margin: 1,
	// 	// 	itemId:'m3',
	// 	// 	emptyText: 'M3',
	// 	// 	flex: 1,
	// 	// 	labelWidth: 0,
	// 	// 	hideLabel: true,
	// 	// 	maskRe: /[0-9.]/,
    //     //     bind:{
	// 	// 		value: '{packinglist.m3}'
    //     //     }
    //     // },
	// 	{
	// 		xtype: 'textfield',
	// 		margin: 1,
	// 		itemId:'widthorigin',
	// 		emptyText: 'Khổ',
	// 		flex: 1,
	// 		labelWidth: 0,
	// 		hideLabel: true,
	// 		maskRe: /[0-9.]/,
    //         bind:{
	// 			value: '{packinglist.widthorigin}'
    //         }
    //     },
    //     {
	// 		xtype: 'textfield',
	// 		margin: 1,
	// 		itemId:'met_origin',
	// 		emptyText: 'SL xuất (m)',
	// 		flex: 1,
	// 		labelWidth: 0,
	// 		hideLabel: true,
	// 		maskRe: /[0-9.]/,
    //         bind:{
	// 			value: '{packinglist.met_origin}'
    //         }
	// 	},		
	// 	{
	// 		tooltip: 'Thêm',
	// 		margin: '0 5 0 5',
	// 		itemId: 'btnThemPKL',
	// 		iconCls: 'x-fa fa-plus',
	// 		weight: 30
	// 	} 		
	// ]
	// }]
});

