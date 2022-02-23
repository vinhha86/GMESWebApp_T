Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Print.Stockout_Pklist_Print_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pklist_Print_View',
    itemId: 'Stockout_Pklist_Print_View',
    reference: 'Stockout_Pklist_Print_View',
    cls: 'Stockout_Pklist_Print_View',
    controller: 'Stockout_Pklist_Print_Controller',
    viewModel:{
        type:'Stockout_Pklist_Print_ViewModel'
    },
    requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.plugin.Exporter',
	],
    plugins: [
        {
            ptype: 'gridexporter',
            // gridexporter: true
        },
    ],
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
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>{name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
    ],
    bind:{
        store:'{PackingListStore}'
    },
    columns:[
        { 
            header: 'Mã NPL', 
            dataIndex: 'skucode', 
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldMaNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueMaNPLKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
            summaryType: 'count',
			summaryRenderer: 'renderCount',
        },
        { 
            header: 'Tên NPL', 
            dataIndex: 'skuname', 
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldTenNPL',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueTenNPLKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Khoang', 
            dataIndex: 'spaceString', 
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldSpace',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueSpaceKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Số Lot', 
            dataIndex: 'lotnumber', 
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldLot',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueLotKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Số cây', 
            dataIndex: 'packageid', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Dài (m)', 
            dataIndex: 'met_check', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if(value == null) value = 0;
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			bind: {
				hidden: '{isMetColumnHidden}',
			},
        },
        { 
            header: 'Dài (y)', 
            dataIndex: 'ydscheck', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if(value == null) value = 0;
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
        },
        { 
            header: 'Khối lượng (kg)', 
            dataIndex: 'grossweight_check', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if(value == null) value = 0;
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			bind: {
				hidden: '{isKgColumnHidden}',
			},
        },
        { 
            header: 'Khối lượng (lbs)', 
            dataIndex: 'grossweight_lbs_check', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if(value == null) value = 0;
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			bind: {
				hidden: '{isLbsColumnHidden}',
			},
        },

        { 
            header: 'Khổ (cm)', 
            dataIndex: 'widthcheck', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if(value == null) value = 0;
				metaData.tdAttr = 'data-qtip="' + value * 100 + '"';
				return value * 100;
			},
        },
        { 
            header: 'Trạng thái', 
            dataIndex: 'warehousestatusString',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
                if(value == 'Chưa tở'){
                    metaData.tdCls = 'redField';
                }else if(value == 'Đã tở'){
                    metaData.tdCls = 'whiteField';
                }
				return value;
			},
        },
        {
			text: 'Ngày tở',
			xtype: 'datecolumn',
			format: 'd/m/Y',
			dataIndex: 'date_check',
            flex: 1,
            sortable: false,
            menuDisabled: true,
			// renderer: function (value, metaData, record, rowIdx, colIdx, store) {
			// 	metaData.tdAttr = 'data-qtip="' + value + '"';
			// 	return value;
			// }
		},
        { 
            header: 'Mã SP', 
            dataIndex: 'stockinProductString', 
            flex: 1,
			items: {
				xtype: 'textfield',
				fieldStyle: "",
				margin: 1,
				reference: 'ValueFilterFieldProduct',
				width: '99%',
				enableKeyEvents: true,
				listeners: {
					keyup: 'onFilterValueProductKeyup',
					buffer: 500
				}
			},
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        // { 
        //     header: 'Trạng thái', 
        //     dataIndex: 'warehousestatus',
        //     flex: 1,
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
		// 		var val = value == null ? 0 : value;
        //         if(val == 0){
        //             val = 'Chưa tở';
        //         }else{
        //             val = 'Đã tở';
        //         }
		// 		metaData.tdAttr = 'data-qtip="' + val + '"';
		// 		return val;
		// 	},
        // },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            {
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            },
            {
                flex:1,
                border: false
            },
            {
                xtype:'button',
                // text: 'Xóa',
                margin: 3,
                itemId:'btnSwitch',
                iconCls: 'x-fa fa-refresh',
                bind: {
                    text: '{btnSwitchText}'
                }
            },
            {
                xtype:'button',
                text: 'Xóa',
                margin: 3,
                itemId:'btnDelete',
                iconCls: 'x-fa fa-trash',
            },
            {
                xtype:'button',
                text: 'In',
                margin: 3,
                itemId:'btnPrint',
                iconCls: 'x-fa fa-print',
                cfg: {
                    type: 'excel07',
                    ext: 'xlsx'
                }
            },
        ]
    }]
});

